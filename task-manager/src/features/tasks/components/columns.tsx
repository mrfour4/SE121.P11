"use client";

import { Project, Task, TaskStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

import { snakeCaseToTitleCase } from "@/lib/utils";
import { MoreVertical } from "lucide-react";

import { ColumnHeader } from "./column-header";
import { TaskActions } from "./task-action";
import { TaskDate } from "./task-date";

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return <ColumnHeader title="Name" column={column} />;
        },
        cell: ({ row }) => {
            return <p className="line-clamp-1">{row.original.name}</p>;
        },
    },
    {
        accessorKey: "project",
        header: ({ column }) => {
            return <ColumnHeader title="Project" column={column} />;
        },
        cell: ({ row }) => {
            const project = row.original.project as Project;
            return (
                <div className="flex items-center gap-x-2 text-sm font-medium">
                    <ProjectAvatar
                        className="size-6"
                        name={project.name}
                        image={project.imageUrl}
                    />
                    <p className="line-clamp-1">{project.name}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "assignee",
        header: ({ column }) => {
            return <ColumnHeader title="Assignee" column={column} />;
        },
        cell: ({ row }) => {
            const assignee = row.original.assignee;
            return (
                <div className="flex items-center gap-x-2 text-sm font-medium">
                    <MemberAvatar
                        className="size-6"
                        fallbackClassName="text-xs"
                        name={assignee.name}
                    />
                    <p className="line-clamp-1">{assignee.name}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "dueDate",
        header: ({ column }) => {
            return <ColumnHeader title="Due Date" column={column} />;
        },
        cell: ({ row }) => {
            const dueDate = row.original.dueDate;
            return <TaskDate value={dueDate} className="line-clamp-1" />;
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return <ColumnHeader title="Status" column={column} />;
        },
        cell: ({ row }) => {
            const status = row.original.status as TaskStatus;
            return (
                <Badge variant={status}>{snakeCaseToTitleCase(status)}</Badge>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const id = row.original.$id;
            const projectId = row.original.projectId;
            return (
                <TaskActions id={id} projectId={projectId}>
                    <Button variant="ghost" size="icon">
                        <MoreVertical />
                    </Button>
                </TaskActions>
            );
        },
    },
];
