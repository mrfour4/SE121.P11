"use server";

import { followUser } from "@/features/username/service/follow-user";
import { unfollowUser } from "@/features/username/service/unfollow-user";

import { revalidatePath } from "next/cache";

export const handleFollow = async (id: string) => {
    const followedUser = await followUser(id);

    revalidatePath("/");

    if (followedUser) {
        revalidatePath(`/user/${followedUser.following.username}`);
    }

    return followedUser;
};

export const handleUnfollow = async (id: string) => {
    const unfollowedUser = await unfollowUser(id);

    revalidatePath("/");

    if (unfollowedUser) {
        revalidatePath(`/user/${unfollowedUser.following.username}`);
    }

    return unfollowedUser;
};
