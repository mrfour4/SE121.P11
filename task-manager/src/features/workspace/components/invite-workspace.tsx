"use client";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";

import { JoinWorkspaceForm } from "@/features/workspace/components/join-workspace-form";

import { useGetWorkspaceInfo } from "@/features/workspace/api/use-get-workspace-info";
import { useInviteCode } from "@/features/workspace/hooks/use-invite-code";
import { useWorkspaceId } from "@/features/workspace/hooks/use-workspace-id";

export function InviteWorkspacePage() {
    const workspaceId = useWorkspaceId();
    const inviteCode = useInviteCode();

    const { data, isLoading } = useGetWorkspaceInfo(workspaceId);

    if (isLoading) {
        return <PageLoader />;
    }

    if (!data) {
        return <PageError message="Workspace not found" />;
    }

    return (
        <div className="w-full lg:max-w-xl">
            <JoinWorkspaceForm
                initialValues={{
                    workspaceId,
                    inviteCode,
                    name: data.name,
                }}
            />
        </div>
    );
}
