import { Doc, Id } from "./_generated/dataModel";
import { mutation, query, QueryCtx } from "./_generated/server";

import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";

import { getCurrentUserOrThrow } from "./users";

type Thread = {
    count: number;
    image: string | undefined;
    timestamp: number;
    name: string;
};

const normalizeReactions = (reactions: Doc<"reactions">[]) => {
    const dedupedReactions = reactions.reduce(
        (acc, reaction) => {
            const existingReaction = acc.find(
                (r) => r.value === reaction.value,
            );

            if (existingReaction) {
                existingReaction.memberIds = Array.from(
                    new Set([...existingReaction.memberIds, reaction.memberId]),
                );
            } else {
                acc.push({
                    ...reaction,
                    memberIds: [reaction.memberId],
                });
            }

            return acc;
        },
        [] as (Doc<"reactions"> & {
            memberIds: Id<"members">[];
        })[],
    );

    const reactionsWithoutMemberId = dedupedReactions.map(
        ({ memberId, ...rest }) => ({
            ...rest,
            count: rest.memberIds.length,
        }),
    );

    return reactionsWithoutMemberId;
};

const populateThread = async (
    ctx: QueryCtx,
    messageId: Id<"messages">,
): Promise<Thread> => {
    const messages = await ctx.db
        .query("messages")
        .withIndex("by_parent_message_id", (q) =>
            q.eq("parentMessageId", messageId),
        )
        .collect();

    if (messages.length === 0) {
        return {
            count: 0,
            image: undefined,
            timestamp: 0,
            name: "",
        };
    }

    const lastMessage = messages[messages.length - 1];
    const lastMessageMember = await populateMember(ctx, lastMessage.memberId);

    if (!lastMessageMember) {
        return {
            count: messages.length,
            image: undefined,
            timestamp: 0,
            name: "",
        };
    }

    const lastMessageUser = await populateUser(ctx, lastMessageMember.userId);

    return {
        count: messages.length,
        image: lastMessageUser?.imageUrl,
        timestamp: lastMessage._creationTime,
        name: lastMessageUser?.name || "",
    };
};

const populateReactions = (ctx: QueryCtx, messageId: Id<"messages">) => {
    return ctx.db
        .query("reactions")
        .withIndex("by_message_id", (q) => q.eq("messageId", messageId))
        .collect();
};

const populateUser = (ctx: QueryCtx, userId: Id<"users">) => {
    return ctx.db.get(userId);
};

const populateMember = (ctx: QueryCtx, memberId: Id<"members">) => {
    return ctx.db.get(memberId);
};

export const getMember = async (
    ctx: QueryCtx,
    workspaceId: Id<"workspaces">,
    userId: Id<"users">,
) => {
    return await ctx.db
        .query("members")
        .withIndex("by_user_id_workspace_id", (q) =>
            q.eq("userId", userId).eq("workspaceId", workspaceId),
        )
        .unique();
};

export const getById = query({
    args: { id: v.id("messages") },
    handler: async (ctx, { id }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const message = await ctx.db.get(id);

        if (!message) {
            return null;
        }

        const currentMember = await getMember(ctx, message.workspaceId, userId);

        if (!currentMember) {
            return null;
        }

        const member = await populateMember(ctx, message.memberId);

        if (!member) {
            return null;
        }

        const user = await populateUser(ctx, member.userId);

        if (!user) {
            return null;
        }

        const reactions = await populateReactions(ctx, message._id);

        const normalizedReactions = normalizeReactions(reactions);

        return {
            ...message,
            image: message.image
                ? await ctx.storage.getUrl(message.image)
                : undefined,
            user,
            member,
            reactions: normalizedReactions,
        };
    },
});

export const get = query({
    args: {
        channelId: v.optional(v.id("channels")),
        conversationId: v.optional(v.id("conversations")),
        parentMessageId: v.optional(v.id("messages")),
        paginationOpts: paginationOptsValidator,
    },
    handler: async (
        ctx,
        { channelId, conversationId, parentMessageId, paginationOpts },
    ) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        let _conversationId = conversationId;

        // Only possible if we are replying in a thread in 1:1 conversation
        if (!conversationId && !channelId && parentMessageId) {
            const parentMessage = await ctx.db.get(parentMessageId);

            if (!parentMessage) {
                throw new ConvexError("Parent message not found");
            }

            _conversationId = parentMessage.conversationId;
        }

        const results = await ctx.db
            .query("messages")
            .withIndex("by_channel_id_parent_message_id_conversation_id", (q) =>
                q
                    .eq("channelId", channelId)
                    .eq("parentMessageId", parentMessageId)
                    .eq("conversationId", _conversationId),
            )
            .order("desc")
            .paginate(paginationOpts);

        return {
            ...results,
            page: (
                await Promise.all(
                    results.page.map(async (message) => {
                        const member = await populateMember(
                            ctx,
                            message.memberId,
                        );
                        const user = member
                            ? await populateUser(ctx, member.userId)
                            : null;

                        if (!member || !user) {
                            return null;
                        }

                        const reactions = await populateReactions(
                            ctx,
                            message._id,
                        );
                        const thread = await populateThread(ctx, message._id);
                        const image = message.image
                            ? await ctx.storage.getUrl(message.image)
                            : undefined;

                        const normalizedReactions =
                            normalizeReactions(reactions);

                        return {
                            ...message,
                            image,
                            member,
                            user,
                            reactions: normalizedReactions,
                            threadCount: thread.count,
                            threadName: thread.name,
                            threadImage: thread.image,
                            threadTimestamp: thread.timestamp,
                        };
                    }),
                )
            ).filter((message) => message !== null),
        };
    },
});

export const create = mutation({
    args: {
        body: v.string(),
        image: v.optional(v.id("_storage")),
        workspaceId: v.id("workspaces"),
        channelId: v.optional(v.id("channels")),
        conversationId: v.optional(v.id("conversations")),
        parentMessageId: v.optional(v.id("messages")),
    },
    handler: async (
        ctx,
        {
            body,
            image,
            workspaceId,
            channelId,
            conversationId,
            parentMessageId,
        },
    ) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const member = await getMember(ctx, workspaceId, userId);

        if (!member) {
            throw new ConvexError("Unauthorized");
        }

        let _conversationId = conversationId;

        // Only possible if we are replying in a thread in 1:1 conversation
        if (!conversationId && !channelId && parentMessageId) {
            const parentMessage = await ctx.db.get(parentMessageId);

            if (!parentMessage) {
                throw new ConvexError("Parent message not found");
            }

            _conversationId = parentMessage.conversationId;
        }

        const messageId = await ctx.db.insert("messages", {
            body,
            image,
            channelId,
            workspaceId,
            parentMessageId,
            memberId: member._id,
            conversationId: _conversationId,
        });

        return messageId;
    },
});

export const update = mutation({
    args: {
        id: v.id("messages"),
        body: v.string(),
    },
    handler: async (ctx, { id, body }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const message = await ctx.db.get(id);

        if (!message) {
            throw new ConvexError("Message not found");
        }

        const member = await getMember(ctx, message.workspaceId, userId);

        if (!member || member._id !== message.memberId) {
            throw new ConvexError("Unauthorized");
        }

        await ctx.db.patch(id, {
            body,
            updateAt: Date.now(),
        });

        return id;
    },
});

export const remove = mutation({
    args: {
        id: v.id("messages"),
    },
    handler: async (ctx, { id }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const message = await ctx.db.get(id);

        if (!message) {
            throw new ConvexError("Message not found");
        }

        const member = await getMember(ctx, message.workspaceId, userId);

        if (!member || member._id !== message.memberId) {
            throw new ConvexError("Unauthorized");
        }

        await ctx.db.delete(id);

        return id;
    },
});
