"use client";

import Link from "next/link";
import { Fragment } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Analytics } from "@/components/analytics";
import { PageError } from "@/components/page-error";
import { Pencil } from "lucide-react";

import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";

import { useGetProject } from "@/features/projects/api/use-get-project";
import { useGetProjectAnalytics } from "@/features/projects/api/use-get-project-analytics";
import { useProjectId } from "@/features/projects/hooks/use-project-id";

export default function ProjectPage() {
    const projectId = useProjectId();

    const { data: project, isLoading, isError } = useGetProject(projectId);
    const analytics = useGetProjectAnalytics(projectId);

    if (isError) {
        return <PageError message="Project not found" />;
    }

    return (
        <div className="flex flex-col gap-y-4">
            {isLoading && (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                        <Skeleton className="size-8" />
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-40 rounded-full" />
                            <Skeleton className="h-3 w-20 rounded-full" />
                        </div>
                    </div>

                    <div>
                        <Skeleton className="h-10 w-20 rounded-md" />
                    </div>
                </div>
            )}
            {project && (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                        <ProjectAvatar
                            name={project?.name}
                            image={project?.imageUrl}
                            className="size-8"
                        />
                        <p className="text-lg font-semibold">{project?.name}</p>
                    </div>

                    <div>
                        <Button variant="secondary" size="sm" asChild>
                            <Link
                                href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}
                            >
                                <Pencil />
                                Edit project
                            </Link>
                        </Button>
                    </div>
                </div>
            )}

            {analytics.isLoading && (
                <div className="flex h-28 w-full gap-1">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <Fragment key={index}>
                            <Skeleton className="flex-1" />
                        </Fragment>
                    ))}
                </div>
            )}
            {!analytics.isLoading && analytics.data && (
                <Analytics data={analytics.data} />
            )}
            <TaskViewSwitcher hideProjectFilter />
        </div>
    );
}
