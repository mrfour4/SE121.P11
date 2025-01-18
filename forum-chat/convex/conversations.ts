import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const createOrGet = mutation({
    args: {
        memberId: v.id("members"),
        workspaceId: v.id("workspaces"),
    },
    handler: async (ctx, { memberId, workspaceId }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const currentMember = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", userId).eq("workspaceId", workspaceId),
            )
            .unique();

        const otherMember = await ctx.db.get(memberId);

        if (!currentMember || !otherMember) {
            throw new ConvexError("Member not found");
        }

        const existingConversation = await ctx.db
            .query("conversations")
            .filter((q) => q.eq(q.field("workspaceId"), workspaceId))
            .filter((q) =>
                q.or(
                    q.and(
                        q.eq(q.field("memberOne"), currentMember._id),
                        q.eq(q.field("memberTwo"), otherMember._id),
                    ),
                    q.and(
                        q.eq(q.field("memberOne"), otherMember._id),
                        q.eq(q.field("memberTwo"), currentMember._id),
                    ),
                ),
            )
            .unique();

        if (existingConversation) {
            return existingConversation._id;
        }

        const conversationId = await ctx.db.insert("conversations", {
            workspaceId,
            memberOne: currentMember._id,
            memberTwo: otherMember._id,
        });

        return conversationId;
    },
});
