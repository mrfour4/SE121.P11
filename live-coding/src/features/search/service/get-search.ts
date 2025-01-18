import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

import { getSelf } from "@/features/auth/service/get-self";

export const getSearch = async (term?: string) => {
    let userId;

    try {
        const self = await getSelf();
        userId = self.id;
    } catch (error) {
        userId = null;
    }

    let streams = [];

    const whereClause: Prisma.StreamWhereInput = {
        OR: [
            {
                name: {
                    contains: term,
                },
            },
            {
                user: {
                    username: {
                        contains: term,
                    },
                },
            },
        ],
    };

    if (userId) {
        whereClause.user = {
            NOT: {
                blocking: {
                    some: {
                        blockedId: userId,
                    },
                },
            },
        };
    }

    streams = await db.stream.findMany({
        where: whereClause,
        select: {
            id: true,
            name: true,
            isLive: true,
            thumbnailUrl: true,
            updatedAt: true,
            user: true,
        },
        orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
    });

    return streams;
};
