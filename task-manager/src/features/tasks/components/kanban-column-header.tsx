"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { TaskStatus } from "@/types";
import { STATUS_ICON_MAP } from "../constants";

import { snakeCaseToTitleCase } from "@/lib/utils";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

type Props = {
    board: TaskStatus;
    taskCount: number;
};

export const KanbanColumnHear = ({ board, taskCount }: Props) => {
    const { open } = useCreateTaskModal();

    const icon = STATUS_ICON_MAP[board];

    return (
        <div className="flex items-center justify-between px-2 py-1.5">
            <div className="flex items-center gap-x-2">
                {icon}
                <h2 className="text-sm font-medium">
                    {snakeCaseToTitleCase(board)}
                </h2>
                <div className="flex size-5 items-center justify-center rounded-md bg-neutral-200 text-xs font-medium text-neutral-700">
                    {taskCount}
                </div>
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="size-5"
                onClick={open}
            >
                <Plus className="text-neutral-500" />
            </Button>
        </div>
    );
};
