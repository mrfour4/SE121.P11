"use client";

import "@livekit/components-styles";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import {
    LiveKitRoom,
    RoomAudioRenderer,
    VideoConference,
} from "@livekit/components-react";

import { Loader } from "lucide-react";

type Props = {
    chatId: string;
    onDisconnected: () => void;
};

export const MediaRoom = ({ chatId, onDisconnected }: Props) => {
    const { user } = useUser();
    const [token, setToken] = useState("");

    useEffect(() => {
        if (!user?.firstName || !user.lastName) return;

        (async () => {
            try {
                const res = await fetch(
                    `/api/livekit?room=${chatId}&username=${user.fullName}`,
                );
                const data = await res.json();

                setToken(data.token);
            } catch (error) {
                console.log("🚀 ~ Media room ~ error:", error);
            }
        })();
    }, [
        chatId,
        user?.firstName,
        user?.lastName,
        user?.fullName,
        user?.emailAddresses,
    ]);

    if (token === "") {
        return (
            <div className="flex flex-1 flex-col items-center justify-center">
                <Loader className="my-4 size-7 animate-spin text-zinc-500" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading...
                </p>
            </div>
        );
    }
    return (
        <LiveKitRoom
            data-lk-theme="default"
            video
            token={token}
            connect
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            onDisconnected={onDisconnected}
        >
            <VideoConference />
            <RoomAudioRenderer />
        </LiveKitRoom>
    );
};
