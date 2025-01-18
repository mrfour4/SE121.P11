import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const getSelf = async () => {
    const self = await currentUser();

    if (!self || !self.username) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: {
            externalUserId: self.id,
        },
    });

    if (!user) {
        throw new Error("Not found");
    }

    return user;
};
