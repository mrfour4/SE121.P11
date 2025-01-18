"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { TaskExtend } from "@/types";
import { Pencil } from "lucide-react";

import { DotSeparator } from "@/components/dot-separator";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { OverviewProperty } from "./overview-property";
import { TaskDate } from "./task-date";

import { snakeCaseToTitleCase } from "@/lib/utils";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";

type Props = {
    task: TaskExtend;
};

export const TaskOverview = ({ task }: Props) => {
    const { open } = useEditTaskModal();
    return (
        <div className="col-span-1 flex flex-col gap-y-4">
            <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Overview</p>
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => open(task.$id)}
                    >
                        <Pencil />
                        Edit
                    </Button>
                </div>
                <DotSeparator className="my-4" />
                <div className="flex flex-col gap-y-4">
                    <OverviewProperty label="Assignee">
                        <MemberAvatar
                            name={task.assignee?.name}
                            className="size-6"
                        />
                        <p className="text-sm font-medium">
                            {task.assignee?.name}
                        </p>
                    </OverviewProperty>
                    <OverviewProperty label="Due date">
                        <TaskDate
                            value={task.dueDate}
                            className="text-sm font-medium"
                        />
                    </OverviewProperty>
                    <OverviewProperty label="Status">
                        <Badge variant={task.status}>
                            {snakeCaseToTitleCase(task.status)}
                        </Badge>
                    </OverviewProperty>
                </div>
            </div>
        </div>
    );
};
