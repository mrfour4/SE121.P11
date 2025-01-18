"use client";

import { PageError } from "@/components/page-error";

import { EditWorkspaceForm } from "@/features/workspace/components/edit-workspace-form";

import { SettingLoading } from "@/features/projects/components/settings-loading";
import { useGetWorkspace } from "@/features/workspace/api/use-get-workspace";
import { useWorkspaceId } from "@/features/workspace/hooks/use-workspace-id";

export default function WorkspaceSettingPage() {
    const workspaceId = useWorkspaceId();

    const { data: initialData, isLoading } = useGetWorkspace(workspaceId);

    if (isLoading) {
        return <SettingLoading title="Workspace settings" />;
    }

    if (!initialData) {
        return <PageError message="Workspace not found" />;
    }

    return (
        <div className="size-full lg:max-w-xl">
            <EditWorkspaceForm initialData={initialData} />
        </div>
    );
}
