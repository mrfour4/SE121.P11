import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const createComment = mutation({
    args: { snippetId: v.id("snippets"), content: v.string() },
    handler: async (ctx, { snippetId, content }) => {
        const user = await getCurrentUserOrThrow(ctx);

        return ctx.db.insert("comments", {
            content,
            snippetId,
            userId: user.userId,
            userName: user.name,
        });
    },
});

export const deleteComment = mutation({
    args: { id: v.id("comments") },
    handler: async (ctx, { id }) => {
        const user = await getCurrentUserOrThrow(ctx);
        const comment = await ctx.db.get(id);

        if (!comment || comment.userId !== user.userId) {
            throw new Error("Failed to delete comment");
        }

        return ctx.db.delete(id);
    },
});

export const getComments = query({
    args: { snippetId: v.id("snippets") },
    handler: async (ctx, { snippetId }) => {
        return ctx.db
            .query("comments")
            .withIndex("by_snippet_id", (q) => q.eq("snippetId", snippetId))
            .order("desc")
            .collect();
    },
});
