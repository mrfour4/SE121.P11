import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Project, TaskExtend } from "@/types";

import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { ChevronRight, Trash } from "lucide-react";

import { useWorkspaceId } from "@/features/workspace/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";
import { useDeleteTask } from "../api/use-delete-task";

type Props = {
    project: Project;
    task: TaskExtend;
};

export const TaskBreadcrumbs = ({ project, task }: Props) => {
    const workspaceId = useWorkspaceId();

    const router = useRouter();
    const { ConfirmDialog, confirm } = useConfirm({
        title: "Delete Task",
        message:
            "This action cannot be undone. Are you sure you want to delete this task?",
    });

    const { mutate, isPending } = useDeleteTask();

    const onDelete = async () => {
        const ok = await confirm();
        if (!ok) return;

        mutate(
            { param: { taskId: task.$id } },
            {
                onSuccess: () => {
                    router.push(`/workspaces/${workspaceId}/tasks`);
                },
            },
        );
    };

    return (
        <div className="flex items-center gap-x-2">
            <ConfirmDialog />
            <ProjectAvatar
                name={project.name}
                image={project.imageUrl}
                className="size-6 lg:size-8"
            />
            <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
                <p className="text-sm text-muted-foreground transition hover:opacity-75 lg:text-lg">
                    {project.name}
                </p>
            </Link>
            <ChevronRight className="size-4 text-muted-foreground lg:size-5" />
            <p className="text-sm font-semibold lg:text-lg">{task.name}</p>

            <Button
                variant="destructive"
                size="sm"
                className="ml-auto"
                onClick={onDelete}
                disabled={isPending}
            >
                <Trash />
                <span className="hidden lg:block">Delete Task</span>
            </Button>
        </div>
    );
};
