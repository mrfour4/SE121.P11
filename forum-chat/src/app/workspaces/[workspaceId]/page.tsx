"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Loader, TriangleAlert } from "lucide-react";

import { useModalStore } from "@/providers/modal-store-provider";

import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useCurrentWorkSpace } from "@/features/workspaces/hooks/use-current-workspace";

export default function WorkspaceIdPage() {
    const router = useRouter();

    const workspace = useCurrentWorkSpace();
    const channels = useGetChannels();
    const member = useCurrentMember();

    const { isOpen, type, onOpen } = useModalStore((state) => state);
    const isModalOpen = isOpen && type === "create-channel";

    const channelId = channels.data?.[0]?._id;
    const isAdmin = member.data?.role === "admin";

    useEffect(() => {
        if (
            workspace.isPending ||
            channels.isPending ||
            !workspace.data ||
            !member.data
        )
            return;

        if (channelId) {
            router.replace(
                `/workspaces/${workspace.data._id}/channels/${channelId}`,
            );
        } else if (!isModalOpen && isAdmin) {
            onOpen("create-channel");
        }
    }, [
        workspace,
        channels,
        isAdmin,
        member,
        channelId,
        router,
        isModalOpen,
        onOpen,
    ]);

    if (workspace.isPending || channels.isPending) {
        return (
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-2">
                <Loader className="size-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!workspace.data) {
        return (
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-2">
                <TriangleAlert className="size-6 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                    Workspace not found
                </p>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-1 flex-col items-center justify-center gap-2">
            <TriangleAlert className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No channel found</p>
        </div>
    );
}
