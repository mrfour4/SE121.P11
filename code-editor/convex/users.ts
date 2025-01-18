import { UserJSON } from "@clerk/nextjs/server";
import { v, Validator } from "convex/values";
import { internalMutation, query, QueryCtx } from "./_generated/server";

const userByExternalId = async (ctx: QueryCtx, externalId: string) => {
    return ctx.db
        .query("users")
        .withIndex("by_user_id", (q) => q.eq("userId", externalId))
        .unique();
};

export const getCurrentUser = async (ctx: QueryCtx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) {
        return null;
    }

    return await userByExternalId(ctx, identity.subject);
};

export const getCurrentUserOrThrow = async (ctx: QueryCtx) => {
    const user = await getCurrentUser(ctx);

    if (user === null) {
        throw new Error("Not authenticated");
    }

    return user;
};

export const deleteFromClerk = internalMutation({
    args: { clerkUserId: v.string() },
    async handler(ctx, { clerkUserId }) {
        const user = await userByExternalId(ctx, clerkUserId);

        if (user === null) {
            console.warn(
                `Can't delete user, there is none for Clerk user ID: ${clerkUserId}`,
            );
        } else {
            await ctx.db.delete(user._id);
        }
    },
});

export const upsertFromClerk = internalMutation({
    args: { data: v.any() as Validator<UserJSON> },
    async handler(ctx, { data }) {
        const userAttributes = {
            userId: data.id,
            email: data.email_addresses[0].email_address,
            name:
                data.first_name + " " + data.last_name ||
                data.email_addresses[0].email_address,
            imageUrl: data.image_url,
        };

        const user = await userByExternalId(ctx, userAttributes.userId);
        if (user === null) {
            await ctx.db.insert("users", userAttributes);
        } else {
            await ctx.db.patch(user._id, userAttributes);
        }
    },
});

export const current = query({
    args: {},
    handler: async (ctx) => {
        return await getCurrentUser(ctx);
    },
});

export const getUser = query({
    args: { userId: v.string() },

    handler: async (ctx, { userId }) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_user_id", (q) => q.eq("userId", userId))
            .unique();

        return user;
    },
});
