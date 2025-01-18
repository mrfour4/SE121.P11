"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { PageError } from "@/components/page-error";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectAvatar } from "./project-avatar";

import { cn } from "@/lib/utils";
import { RiAddCircleFill } from "react-icons/ri";

import { useWorkspaceId } from "@/features/workspace/hooks/use-workspace-id";
import { useGetProjects } from "../api/use-get-projects";
import { useCreateProjectModal } from "../hooks/use-create-project-modal";

export const Projects = () => {
    const workspaceId = useWorkspaceId();

    const { open } = useCreateProjectModal();

    const { data, isLoading, isError } = useGetProjects(workspaceId);

    const pathname = usePathname();

    if (isError) {
        return <PageError message="Failed to load projects" />;
    }

    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase text-neutral-500">
                    Projects
                </p>
                <RiAddCircleFill
                    onClick={open}
                    className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75"
                />
            </div>

            {isLoading && (
                <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-1">
                        <Skeleton className="size-5 rounded-full" />
                        <Skeleton className="h-5 flex-1" />
                    </div>
                    <div className="flex items-center gap-x-1">
                        <Skeleton className="size-5 rounded-full" />
                        <Skeleton className="h-5 flex-1" />
                    </div>
                    <div className="flex items-center gap-x-1">
                        <Skeleton className="size-5 rounded-full" />
                        <Skeleton className="h-5 flex-1" />
                    </div>
                    <div className="flex items-center gap-x-1">
                        <Skeleton className="size-5 rounded-full" />
                        <Skeleton className="h-5 flex-1" />
                    </div>
                </div>
            )}

            {!isLoading &&
                data?.documents.map((project) => {
                    const href = `/workspaces/${workspaceId}/projects/${project.$id}`;
                    const isActive = pathname === href;

                    return (
                        <Link href={href} key={project.$id}>
                            <div
                                className={cn(
                                    "flex cursor-pointer items-center gap-2.5 rounded-md p-2.5 text-neutral-500 transition hover:opacity-75",
                                    isActive &&
                                        "bg-white text-primary shadow-sm hover:opacity-100",
                                )}
                            >
                                <ProjectAvatar
                                    image={project.imageUrl}
                                    name={project.name}
                                    fallbackClassName="text-sm"
                                />
                                <span className="truncate">{project.name}</span>
                            </div>
                        </Link>
                    );
                })}
        </div>
    );
};
