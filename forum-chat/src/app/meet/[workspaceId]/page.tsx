"use client";

import { useRouter } from "next/navigation";

import { MediaRoom } from "@/components/media-room";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export default function MeetPage() {
    const workspaceId = useWorkspaceId();
    const router = useRouter();

    return (
        <MediaRoom
            chatId={workspaceId}
            onDisconnected={() => {
                router.push("/");
            }}
        />
    );
}
