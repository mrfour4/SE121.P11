"use server";

import { revalidatePath } from "next/cache";

import { RoomServiceClient } from "livekit-server-sdk";

import { getSelf } from "@/features/auth/service/get-self";
import { blockUser } from "@/features/username/service/block-user";
import { unblockUser } from "@/features/username/service/unblock-user";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_SECRET!,
);

export const handleBlock = async (id: string) => {
    const self = await getSelf();

    let blockedUser;
    try {
        blockedUser = await blockUser(id);
    } catch (error) {
        // This mean user is a guest
    }

    try {
        await roomService.removeParticipant(self.id, id);
    } catch (error) {
        // This mean user is not in the room
    }

    revalidatePath(`/u/${self.username}/community`);

    return blockedUser;
};

export const handleUnblock = async (id: string) => {
    const self = await getSelf();
    const unblockedUser = await unblockUser(id);

    revalidatePath(`/u/${self.username}/community`);

    return unblockedUser;
};
