import { getSelf } from "@/features/auth/service/get-self";
import { db } from "@/lib/db";

export const getFollowers = async () => {
    try {
        const self = await getSelf();

        const followedUsers = await db.follow.findMany({
            where: {
                followerId: self.id,
                following: {
                    blocking: {
                        none: {
                            blockedId: self.id,
                        },
                    },
                },
            },
            include: {
                following: {
                    include: {
                        stream: {
                            select: {
                                isLive: true,
                            },
                        },
                    },
                },
            },
        });

        return followedUsers;
    } catch (error) {
        return [];
    }
};
