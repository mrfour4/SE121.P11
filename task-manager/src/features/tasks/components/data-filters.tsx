"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { DatePicker } from "@/components/date-picker";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

import { TaskStatus } from "@/types";
import { Folder, ListCheck, Loader, User2 } from "lucide-react";

import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspace/hooks/use-workspace-id";
import { useTaskFilters } from "../hooks/use-task-filters";

import { snakeCaseToTitleCase } from "@/lib/utils";

type Props = {
    hideProjectFilter?: boolean;
};

export const DataFilters = ({ hideProjectFilter }: Props) => {
    const workspaceId = useWorkspaceId();

    const projects = useGetProjects(workspaceId);
    const members = useGetMembers(workspaceId);

    const [{ assigneeId, projectId, status, dueDate, search }, setFilters] =
        useTaskFilters();

    const projectOptions = projects.data?.documents?.map((project) => ({
        label: project.name,
        value: project.$id,
        imageUrl: project.imageUrl,
    }));

    const memberOptions = members.data?.documents?.map((member) => ({
        label: member.name,
        value: member.$id,
    }));

    const onValueChange = <T,>(key: string, value: T) => {
        setFilters({ [key]: value === "all" ? null : value });
    };

    return (
        <div className="flex flex-col gap-2 lg:flex-row">
            <Select
                value={status ?? undefined}
                onValueChange={(value: TaskStatus) =>
                    onValueChange("status", value)
                }
            >
                <SelectTrigger className="h-8 w-full lg:w-auto">
                    <div className="flex items-center pr-2">
                        <ListCheck className="mr-2 size-4" />
                        <SelectValue placeholder="All statuses" />
                    </div>
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectSeparator />
                    {Object.values(TaskStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                            {snakeCaseToTitleCase(status)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={assigneeId ?? undefined}
                onValueChange={(value: string) =>
                    onValueChange("assigneeId", value)
                }
            >
                <SelectTrigger className="h-8 w-full lg:w-auto">
                    <div className="flex items-center pr-2">
                        <User2 className="mr-2 size-4" />
                        <SelectValue placeholder="All assignees" />
                    </div>
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">All assignees</SelectItem>
                    <SelectSeparator />
                    {members.isLoading && (
                        <SelectItem disabled value="none">
                            <div className="flex items-center gap-2">
                                <Loader className="size-4 animate-spin text-muted-foreground" />
                                <span>Loading members...</span>
                            </div>
                        </SelectItem>
                    )}

                    {memberOptions?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            <div className="mr-2 flex items-center gap-x-2">
                                <MemberAvatar
                                    name={option.label}
                                    fallbackClassName="text-xs font-medium"
                                />
                                <span>{option.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {!hideProjectFilter && (
                <Select
                    value={projectId ?? undefined}
                    onValueChange={(value: string) =>
                        onValueChange("projectId", value)
                    }
                >
                    <SelectTrigger className="h-8 w-full lg:w-auto">
                        <div className="flex items-center pr-2">
                            <Folder className="mr-2 size-4" />
                            <SelectValue placeholder="All projects" />
                        </div>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">All projects</SelectItem>
                        <SelectSeparator />
                        {projects.isLoading && (
                            <SelectItem disabled value="none">
                                <div className="flex items-center gap-2">
                                    <Loader className="size-4 animate-spin text-muted-foreground" />
                                    <span>Loading projects...</span>
                                </div>
                            </SelectItem>
                        )}
                        {projectOptions?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                <div className="mr-2 flex items-center gap-x-2">
                                    <ProjectAvatar
                                        name={option.label}
                                        image={option.imageUrl}
                                    />
                                    <span>{option.label}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}

            <DatePicker
                placeholder="Due date"
                className="h-8 w-full lg:w-auto"
                value={dueDate ? new Date(dueDate) : undefined}
                onChange={(date) =>
                    onValueChange("dueDate", date?.toISOString())
                }
            />
        </div>
    );
};
