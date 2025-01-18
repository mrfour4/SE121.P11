import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

import { parsedName } from "../src/lib/utils";

export const get = query({
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

        if (!member) {
            return [];
        }

        const channels = await ctx.db
            .query("channels")
            .withIndex("by_workspace_id", (q) =>
                q.eq("workspaceId", workspaceId),
            )
            .collect();

        return channels;
    },
});

export const getById = query({
    args: {
        id: v.id("channels"),
    },
    handler: async (ctx, { id }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const channel = await ctx.db.get(id);

        if (!channel) {
            return null;
        }

        const member = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", userId).eq("workspaceId", channel.workspaceId),
            )
            .unique();

        if (!member) {
            return null;
        }

        return channel;
    },
});

export const create = mutation({
    args: {
        name: v.string(),
        workspaceId: v.id("workspaces"),
    },
    handler: async (ctx, { name, workspaceId }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const member = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", userId).eq("workspaceId", workspaceId),
            )
            .unique();

        if (!member || member.role !== "admin") {
            throw new ConvexError("Unauthorized");
        }

        const parsedName = name.replace(/\s+/g, "-").toLowerCase();

        const channelId = await ctx.db.insert("channels", {
            name: parsedName,
            workspaceId,
        });

        return channelId;
    },
});

export const update = mutation({
    args: {
        name: v.string(),
        id: v.id("channels"),
    },
    handler: async (ctx, { name, id }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const channel = await ctx.db.get(id);

        if (!channel) {
            throw new ConvexError("Channel not found");
        }

        const member = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", userId).eq("workspaceId", channel.workspaceId),
            )
            .unique();

        if (!member || member.role !== "admin") {
            throw new ConvexError("Unauthorized");
        }

        await ctx.db.patch(id, {
            name: parsedName(name),
        });

        return id;
    },
});

export const remove = mutation({
    args: {
        id: v.id("channels"),
    },
    handler: async (ctx, { id }) => {
        const { userId } = await getCurrentUserOrThrow(ctx);

        const channel = await ctx.db.get(id);

        if (!channel) {
            throw new ConvexError("Channel not found");
        }

        const member = await ctx.db
            .query("members")
            .withIndex("by_user_id_workspace_id", (q) =>
                q.eq("userId", userId).eq("workspaceId", channel.workspaceId),
            )
            .unique();

        if (!member || member.role !== "admin") {
            throw new ConvexError("Unauthorized");
        }

        const [messages] = await Promise.all([
            ctx.db
                .query("messages")
                .withIndex("by_channel_id", (q) => q.eq("channelId", id))
                .collect(),
        ]);

        for (const message of messages) {
            await ctx.db.delete(message._id);
        }

        await ctx.db.delete(id);

        return id;
    },
});
