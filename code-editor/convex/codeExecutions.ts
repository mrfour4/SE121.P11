import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

import { differenceInHours } from "date-fns";

export const saveExecution = mutation({
    args: {
        language: v.string(),
        code: v.string(),
        output: v.optional(v.string()),
        error: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await getCurrentUserOrThrow(ctx);

        ctx.db.insert("codeExecutions", {
            ...args,
            userId: user.userId,
        });
    },
});

export const getLastExecution = query({
    args: {},
    handler: async (ctx) => {
        const user = await getCurrentUserOrThrow(ctx);

        const lastExecution = await ctx.db
            .query("codeExecutions")
            .withIndex("by_user_id", (q) => q.eq("userId", user.userId))
            .order("desc")
            .first();

        return lastExecution;
    },
});

export const getUserStats = query({
    args: { userId: v.string() },
    handler: async (ctx, { userId }) => {
        const executions = await ctx.db
            .query("codeExecutions")
            .withIndex("by_user_id", (q) => q.eq("userId", userId))
            .collect();

        const starredSnippets = await ctx.db
            .query("stars")
            .withIndex("by_user_id", (q) => q.eq("userId", userId))
            .collect();

        const snippetIds = starredSnippets.map((star) => star.snippetId);
        const snippetDetails = await Promise.all(
            snippetIds.map((id) => ctx.db.get(id)),
        );

        const starredLanguages = snippetDetails.filter(Boolean).reduce(
            (acc, curr) => {
                if (curr?.language) {
                    acc[curr.language] = (acc[curr.language] || 0) + 1;
                }
                return acc;
            },
            {} as Record<string, number>,
        );

        const mostStarredLanguage =
            Object.entries(starredLanguages).sort(
                ([, a], [, b]) => b - a,
            )[0]?.[0] ?? "N/A";

        const last24Hours = executions.filter(
            (e) =>
                differenceInHours(new Date(), new Date(e._creationTime)) <= 24,
        ).length;

        const languageStats = executions.reduce(
            (acc, curr) => {
                acc[curr.language] = (acc[curr.language] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>,
        );

        const languages = Object.keys(languageStats);
        const favoriteLanguage = languages.length
            ? languages.reduce((a, b) =>
                  languageStats[a] > languageStats[b] ? a : b,
              )
            : "N/A";

        return {
            totalExecutions: executions.length,
            languagesCount: languages.length,
            languages: languages,
            last24Hours,
            favoriteLanguage,
            languageStats,
            mostStarredLanguage,
        };
    },
});

export const getUserExecutions = query({
    args: {
        userId: v.string(),
        paginationOpts: paginationOptsValidator,
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("codeExecutions")
            .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
            .order("desc")
            .paginate(args.paginationOpts);
    },
});
