import { filter } from "convex-helpers/server/filter";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

import { getCurrentUserOrThrow } from "./users";

export const createSnippet = mutation({
    args: {
        title: v.string(),
        executionId: v.id("codeExecutions"),
    },
    handler: async (ctx, { title, executionId }) => {
        const user = await getCurrentUserOrThrow(ctx);

        const execution = await ctx.db.get(executionId);

        if (!execution || execution.error) {
            throw new Error("Invalid execution");
        }

        return ctx.db.insert("snippets", {
            userId: user._id,
            userName: user.name,
            title,
            code: execution.code,
            language: execution.language,
        });
    },
});

export const starSnippet = mutation({
    args: { id: v.id("snippets") },
    handler: async (ctx, { id }) => {
        const user = await getCurrentUserOrThrow(ctx);

        const isStarred = await ctx.db
            .query("stars")
            .withIndex("by_user_id_snippet_id", (q) =>
                q.eq("userId", user._id).eq("snippetId", id),
            )
            .unique();

        if (isStarred) {
            return ctx.db.delete(isStarred._id);
        }

        return ctx.db.insert("stars", {
            userId: user._id,
            snippetId: id,
        });
    },
});

export const deleteSnippet = mutation({
    args: { id: v.id("snippets") },
    handler: async (ctx, { id }) => {
        const user = await getCurrentUserOrThrow(ctx);
        const snippet = await ctx.db.get(id);

        if (!snippet || snippet.userId !== user._id) {
            throw new Error("Forbidden");
        }

        const comments = await ctx.db
            .query("comments")
            .withIndex("by_snippet_id", (q) => q.eq("snippetId", id))
            .collect();
        const stars = await ctx.db
            .query("stars")
            .withIndex("by_snippet_id", (q) => q.eq("snippetId", id))
            .collect();

        await Promise.all([
            ...comments.map((comment) => ctx.db.delete(comment._id)),
            ...stars.map((star) => ctx.db.delete(star._id)),
        ]);

        return ctx.db.delete(id);
    },
});

export const getSnippet = query({
    args: { id: v.id("snippets") },
    handler: async (ctx, { id }) => {
        return ctx.db.get(id);
    },
});

export const isStarred = query({
    args: { id: v.id("snippets") },
    handler: async (ctx, { id }) => {
        const user = await getCurrentUserOrThrow(ctx);

        const isStarred = await ctx.db
            .query("stars")
            .withIndex("by_user_id_snippet_id", (q) =>
                q.eq("userId", user._id).eq("snippetId", id),
            )
            .unique();

        return !!isStarred;
    },
});

export const getSnippets = query({
    args: {
        paginationOpts: paginationOptsValidator,
        search: v.optional(v.string()),
        selectedLanguage: v.optional(v.string()),
    },
    handler: async (ctx, { search, selectedLanguage, paginationOpts }) => {
        return filter(
            ctx.db.query("snippets"),
            ({ title, language, userName }) => {
                if (!search) {
                    return selectedLanguage
                        ? selectedLanguage === language
                        : true;
                }

                const matchesSearch =
                    title.toLowerCase().includes(search.toLowerCase()) ||
                    language.toLowerCase().includes(search.toLowerCase()) ||
                    userName.toLowerCase().includes(search.toLowerCase());

                return (
                    matchesSearch &&
                    (selectedLanguage ? language === selectedLanguage : true)
                );
            },
        )
            .order("desc")
            .paginate(paginationOpts);
    },
});

export const getSnippetStarCount = query({
    args: { id: v.id("snippets") },
    handler: async (ctx, { id }) => {
        const starts = await ctx.db
            .query("stars")
            .withIndex("by_snippet_id", (q) => q.eq("snippetId", id))
            .collect();

        return starts.length;
    },
});

export const getStarredSnippets = query({
    handler: async (ctx) => {
        const user = await getCurrentUserOrThrow(ctx);

        const stars = await ctx.db
            .query("stars")
            .withIndex("by_user_id", (q) => q.eq("userId", user._id))
            .collect();

        const snippets = await Promise.all(
            stars.map((star) => ctx.db.get(star.snippetId)),
        );

        return snippets.filter((snippets) => snippets !== null);
    },
});
