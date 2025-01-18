import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const getSelfByUsername = async (username: string) => {
    const self = await currentUser();

    if (!self || !self.username) {
        throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
        where: { username },
    });

    if (!user) {
        throw new Error("User not found");
    }

    if (self.username !== user.username) {
        throw new Error("Unauthorized");
    }

    return self;
};
