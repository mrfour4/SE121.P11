import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const IMAGES = [
    "/placeholders/1.svg",
    "/placeholders/2.svg",
    "/placeholders/3.svg",
    "/placeholders/4.svg",
    "/placeholders/5.svg",
    "/placeholders/6.svg",
    "/placeholders/7.svg",
    "/placeholders/8.svg",
    "/placeholders/9.svg",
    "/placeholders/10.svg",
];

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favorite: v.optional(v.string()),
    },
    handler: async (ctx, { orgId, search, favorite }) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const title = search as string;
        let boards = [];

        if (title) {
            boards = await ctx.db
                .query("boards")
                .withSearchIndex("search_title", (q) =>
                    q.search("title", title).eq("orgId", orgId),
                )
                .collect();
        } else {
            boards = await ctx.db
                .query("boards")
                .withIndex("by_org", (q) => q.eq("orgId", orgId))
                .order("desc")
                .collect();
        }

        const boardsWithFavorites = await Promise.all(
            boards.map(async (board) => {
                return ctx.db
                    .query("userFavorites")
                    .withIndex("by_user_board", (q) =>
                        q
                            .eq("userId", identity.subject)
                            .eq("boardId", board._id),
                    )
                    .unique()
                    .then((favorite) => ({
                        ...board,
                        isFavorite: !!favorite,
                    }));
            }),
        );

        if (favorite) {
            return boardsWithFavorites.filter((board) => board.isFavorite);
        }

        return boardsWithFavorites;
    },
});

export const getById = query({
    args: { id: v.id("boards") },
    handler: async (ctx, { id }) => {
        const board = await ctx.db.get(id);

        if (!board) {
            throw new Error("Board not found");
        }

        return board;
    },
});

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, { orgId, title }) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const randomImage = IMAGES[Math.floor(Math.random() * IMAGES.length)];

        const board = await ctx.db.insert("boards", {
            title,
            orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage,
        });

        return board;
    },
});

export const update = mutation({
    args: {
        id: v.id("boards"),
        title: v.string(),
    },
    handler: async (ctx, { id, title }) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const titleTrimmed = title.trim();

        if (!titleTrimmed) {
            throw new Error("Title cannot be empty");
        }

        if (titleTrimmed.length > 60) {
            throw new Error("Title is too long");
        }

        const board = await ctx.db.patch(id, {
            title: titleTrimmed,
        });

        return board;
    },
});

export const remove = mutation({
    args: { id: v.id("boards") },
    handler: async (ctx, { id }) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;
        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_board", (q) =>
                q.eq("userId", userId).eq("boardId", id),
            )
            .unique();

        if (existingFavorite) {
            await ctx.db.delete(existingFavorite._id);
        }

        await ctx.db.delete(id);
    },
});

export const favorite = mutation({
    args: { id: v.id("boards"), orgId: v.string() },
    handler: async (ctx, { id, orgId }) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const board = await ctx.db.get(id);

        if (!board) {
            throw new Error("Board not found");
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_board_org", (q) =>
                q.eq("userId", userId).eq("boardId", id).eq("orgId", orgId),
            )
            .unique();

        if (existingFavorite) {
            throw new Error("Already favorited");
        }

        await ctx.db.insert("userFavorites", {
            orgId,
            userId,
            boardId: id,
        });

        return board;
    },
});

export const unfavorite = mutation({
    args: { id: v.id("boards") },
    handler: async (ctx, { id }) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_board", (q) =>
                q.eq("userId", userId).eq("boardId", id),
            )
            .unique();

        if (!existingFavorite) {
            throw new Error("Favorited board not found");
        }

        await ctx.db.delete(existingFavorite._id);
    },
});
