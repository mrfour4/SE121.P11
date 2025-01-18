"use client";

import { useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useConfirm } from "@/hooks/use-confirm";
import { ExternalLink, Pencil, Trash } from "lucide-react";

import { useWorkspaceId } from "@/features/workspace/hooks/use-workspace-id";
import { useDeleteTask } from "../api/use-delete-task";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";

type Props = {
    id: string;
    projectId: string;
    children: React.ReactNode;
};

export const TaskActions = ({ id, projectId, children }: Props) => {
    const workspaceId = useWorkspaceId();
    const router = useRouter();

    const { open } = useEditTaskModal();
    const { ConfirmDialog, confirm } = useConfirm({
        title: "Delete Task",
        message:
            "This action cannot be undone. Are you sure you want to delete this task?",
    });

    const deleteTask = useDeleteTask();

    const isPending = deleteTask.isPending;

    const onDeleteTask = async () => {
        const ok = await confirm();
        if (!ok) return;

        deleteTask.mutate({ param: { taskId: id } });
    };

    const onOpenProject = () => {
        router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
    };

    const onOpenTask = () => {
        router.push(`/workspaces/${workspaceId}/tasks/${id}`);
    };

    return (
        <div className="flex justify-end">
            <ConfirmDialog />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                        className="p-2.5 font-medium"
                        onClick={onOpenTask}
                    >
                        <ExternalLink className="stroke-2" />
                        Task Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="p-2.5 font-medium"
                        onClick={onOpenProject}
                    >
                        <ExternalLink className="stroke-2" />
                        Open Project
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="p-2.5 font-medium"
                        onClick={() => open(id)}
                    >
                        <Pencil className="stroke-2" />
                        Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="p-2.5 font-medium text-amber-700 focus:text-amber-700"
                        onClick={onDeleteTask}
                        disabled={isPending}
                    >
                        <Trash className="stroke-2" />
                        Delete Task
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
