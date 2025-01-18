import { db } from "@/lib/db";

export const getUserByUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username,
        },
        include: {
            stream: {
                omit: {
                    serverUrl: true,
                    streamKey: true,
                    ingressId: true,
                },
            },
            _count: {
                select: {
                    followedBy: true,
                },
            },
        },
    });

    return user;
};
