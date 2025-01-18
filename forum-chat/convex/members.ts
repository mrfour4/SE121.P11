import { ConvexError, v } from "convex/values";

import { Id } from "./_generated/dataModel";
import { mutation, query, QueryCtx } from "./_generated/server";

import { getCurrentUserOrThrow } from "./users";

const populateUser = async (ctx: QueryCtx, id: Id<"users">) => {
    return await ctx.db.get(id);
};

export const current = query({
    args: {
        workspaceId: v.id("workspaces"),
    },
    handler: async (ctx, { workspaceId }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const member = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", userId).eq("workspaceId", workspaceId),
            )
            .unique();

        return member;
    },
});

export const getById = query({
    args: { id: v.id("members") },
    handler: async (ctx, { id }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const member = await ctx.db.get(id);

        if (!member) {
            return null;
        }

        const currentMember = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", userId).eq("workspaceId", member.workspaceId),
            );

        if (!currentMember) {
            return null;
        }

        const user = await populateUser(ctx, member.userId);

        if (!user) {
            return null;
        }

        return {
            ...member,
            user,
        };
    },
});

export const get = query({
    args: {
        workspaceId: v.id("workspaces"),
    },
    handler: async (ctx, { workspaceId }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const data = await ctx.db
            .query("members")
            .withIndex("by_workspace_id", (q) =>
                q.eq("workspaceId", workspaceId),
            )
            .collect();

        const members = [];

        for (const member of data) {
            const user = await populateUser(ctx, member.userId);

            if (user) {
                members.push({
                    ...member,
                    user,
                });
            }
        }

        return members;
    },
});

export const update = mutation({
    args: {
        id: v.id("members"),
        role: v.union(v.literal("admin"), v.literal("member")),
    },
    handler: async (ctx, { id, role }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const member = await ctx.db.get(id);

        if (!member) {
            throw new ConvexError("Member not found");
        }

        const currentMember = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", userId).eq("workspaceId", member.workspaceId),
            )
            .unique();

        if (!currentMember || currentMember.role !== "admin") {
            throw new ConvexError("Unauthorized");
        }

        await ctx.db.patch(id, {
            role,
        });

        return id;
    },
});

export const remove = mutation({
    args: {
        id: v.id("members"),
    },
    handler: async (ctx, { id }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const member = await ctx.db.get(id);

        if (!member) {
            throw new ConvexError("Member not found");
        }

        const currentMember = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", userId).eq("workspaceId", member.workspaceId),
            )
            .unique();

        if (!currentMember) {
            throw new ConvexError("Unauthorized");
        }

        if (member.role === "admin") {
            throw new ConvexError("Admin cannot be removed");
        }

        if (
            currentMember._id === member._id &&
            currentMember.role === "admin"
        ) {
            throw new ConvexError("Cannot remove self if self is an admin");
        }

        const [messages, reactions, conversations] = await Promise.all([
            ctx.db
                .query("messages")
                .withIndex("by_member_id", (q) => q.eq("memberId", member._id))
                .collect(),
            ctx.db
                .query("reactions")
                .withIndex("by_member_id", (q) => q.eq("memberId", member._id))
                .collect(),
            ctx.db
                .query("conversations")
                .filter((q) =>
                    q.or(
                        q.eq(q.field("memberOne"), member._id),
                        q.eq(q.field("memberTwo"), member._id),
                    ),
                )
                .collect(),
        ]);

        for (const message of messages) {
            await ctx.db.delete(message._id);
        }

        for (const reaction of reactions) {
            await ctx.db.delete(reaction._id);
        }

        for (const conversation of conversations) {
            await ctx.db.delete(conversation._id);
        }

        await ctx.db.delete(id);

        return id;
    },
});
