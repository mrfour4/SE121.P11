"use server";

import { AccessToken } from "livekit-server-sdk";

import { getSelf } from "@/features/auth/service/get-self";
import { getUserById } from "@/features/auth/service/get-user-by-id";
import { isBlockedByUser } from "@/features/username/service/check-blocked";

export const createViewerToken = async (hostIdentity: string) => {
    let self;

    try {
        self = await getSelf();
    } catch (error) {
        const id = crypto.randomUUID();
        const username = `guest-${id.slice(0, 8)}`;

        self = { id, username };
    }

    const host = await getUserById(hostIdentity);

    if (!host) {
        throw new Error("Host not found");
    }

    const isBlocked = await isBlockedByUser(host.id);

    if (isBlocked) {
        throw new Error("Host is blocked");
    }

    const isHost = self.id === host.id;

    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_SECRET!,
        {
            identity: isHost ? `host-${self.id}` : self.id,
            name: self.username,
        },
    );

    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,
        canPublishData: true,
    });

    return await Promise.resolve(token.toJwt());
};
