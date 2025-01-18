import { ConvexError, v } from "convex/values";

import { Id } from "./_generated/dataModel";
import { mutation, QueryCtx } from "./_generated/server";

import { getCurrentUserOrThrow } from "./users";

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

export const toggle = mutation({
    args: {
        messageId: v.id("messages"),
        value: v.string(),
    },
    handler: async (ctx, { messageId, value }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const message = await ctx.db.get(messageId);

        if (!message) {
            throw new ConvexError("Message not found");
        }

        const member = await getMember(ctx, message.workspaceId, userId);

        if (!member) {
            throw new ConvexError("Unauthorized");
        }

        const existingReaction = await ctx.db
            .query("reactions")
            .filter((q) =>
                q.and(
                    q.eq(q.field("memberId"), member._id),
                    q.eq(q.field("messageId"), messageId),
                    q.eq(q.field("value"), value),
                ),
            )
            .first();

        if (existingReaction) {
            await ctx.db.delete(existingReaction._id);

            return existingReaction._id;
        } else {
            const newReactionId = await ctx.db.insert("reactions", {
                workspaceId: member.workspaceId,
                memberId: member._id,
                messageId,
                value,
            });

            return newReactionId;
        }
    },
});
