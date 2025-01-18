"use client";

import { CreateChannelModal } from "@/features/channels/components/create-channel-modal";
import { DeleteChannelModal } from "@/features/channels/components/delete-channel-modal";
import { EditChannelModal } from "@/features/channels/components/edit-channel-modal";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { DeleteWorkspaceModal } from "@/features/workspaces/components/delete-workspace-modal";
import { EditWorkspaceModal } from "@/features/workspaces/components/edit-workspace-modal";
import { InviteModal } from "@/features/workspaces/components/invite-modal";

import { useMounted } from "@/hooks/use-mounted";

export const Modals = () => {
    const mounted = useMounted();

    if (!mounted) return null;

    return (
        <div>
            <CreateWorkspaceModal />
            <InviteModal />
            <EditWorkspaceModal />
            <DeleteWorkspaceModal />

            <CreateChannelModal />
            <EditChannelModal />
            <DeleteChannelModal />
        </div>
    );
};
