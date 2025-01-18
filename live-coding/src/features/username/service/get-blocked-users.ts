import { getSelf } from "@/features/auth/service/get-self";
import { db } from "@/lib/db";

export const getBlockedUsers = async () => {
    const self = await getSelf();

    const blockedUsers = await db.block.findMany({
        where: {
            blockerId: self.id,
        },
        include: {
            blocked: true,
        },
    });
    return blockedUsers;
};
