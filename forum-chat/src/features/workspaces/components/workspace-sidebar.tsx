"use client";

import {
    Loader,
    MessageSquareText,
    SendHorizonal,
    TriangleAlert,
} from "lucide-react";

import { SidebarItem } from "@/components/sidebar-item";
import { WorkspaceHeader } from "./workspace-header";
import { WorkspaceSection } from "./workspace-section";

import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useCurrentWorkSpace } from "../hooks/use-current-workspace";

export const WorkspaceSidebar = () => {
    const member = useCurrentMember();
    const workspace = useCurrentWorkSpace();

    if (member.isPending || workspace.isPending) {
        return (
            <div className="flex h-full flex-col items-center justify-center bg-blue-2">
                <Loader className="size-5 animate-spin text-white" />
            </div>
        );
    }

    if (!member.data || !workspace.data) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-y-2 bg-blue-2">
                <TriangleAlert className="size-5 text-white" />
                <p className="text-sm text-white">Workspace not found</p>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col gap-y-2 bg-blue-2">
            <WorkspaceHeader
                workspace={workspace.data}
                isAdmin={member.data.role === "admin"}
            />

            <div className="mt-3 flex flex-col gap-y-1 px-2">
                <SidebarItem
                    id="thread"
                    label="Threads"
                    Icon={MessageSquareText}
                />

                <SidebarItem
                    id="draft"
                    label="Drafts & Sent"
                    Icon={SendHorizonal}
                />
            </div>

            <WorkspaceSection currentMember={member.data} />
        </div>
    );
};
