import { getSelf } from "@/features/auth/service/get-self";
import { db } from "@/lib/db";

export const unfollowUser = async (id: string) => {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
        where: { id },
    });

    if (!otherUser) {
        throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
        throw new Error("You can't unfollow yourself");
    }

    const followed = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id,
        },
    });

    if (!followed) {
        throw new Error("You are not following this user");
    }

    const follow = await db.follow.delete({
        where: {
            id: followed.id,
        },
        include: {
            following: true,
        },
    });

    return follow;
};
