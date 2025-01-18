"use client";

import { Analytics } from "@/components/analytics";
import { PageError } from "@/components/page-error";

import { MembersList } from "@/features/members/components/member-list";
import { ProjectList } from "@/features/projects/components/projects-list";
import { TasksList } from "@/features/tasks/components/tasks-list";

import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useGetWorkspaceAnalytics } from "@/features/workspace/api/use-get-workspace-analytics";
import { useWorkspaceId } from "@/features/workspace/hooks/use-workspace-id";

import { WorkspaceLoadingPage } from "@/features/workspace/components/workspace-loading";

export default function WorkspacePage() {
    const workspaceId = useWorkspaceId();

    const analytics = useGetWorkspaceAnalytics(workspaceId);
    const tasks = useGetTasks({ workspaceId });
    const projects = useGetProjects(workspaceId);
    const members = useGetMembers(workspaceId);

    const isLoading =
        analytics.isLoading ||
        tasks.isLoading ||
        projects.isLoading ||
        members.isLoading;

    if (isLoading) {
        return <WorkspaceLoadingPage />;
    }

    if (!analytics.data || !tasks.data || !projects.data || !members.data) {
        return <PageError message="Failed to load workspace data" />;
    }

    return (
        <div className="flex h-full flex-col space-y-4">
            <Analytics data={analytics.data} />
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <TasksList
                    data={tasks.data.documents}
                    total={tasks.data.total}
                />
                <div className="flex flex-col gap-4">
                    <ProjectList
                        data={projects.data.documents}
                        total={projects.data.total}
                    />
                    <MembersList
                        data={members.data.documents}
                        total={members.data.total}
                    />
                </div>
            </div>
        </div>
    );
}
