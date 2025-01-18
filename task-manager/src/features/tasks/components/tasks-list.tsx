import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { DotSeparator } from "@/components/dot-separator";
import { CalendarIcon, Plus } from "lucide-react";

import { TaskExtend } from "@/types";
import { formatDistanceToNow } from "date-fns";

import { useWorkspaceId } from "@/features/workspace/hooks/use-workspace-id";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

type Props = {
    data: TaskExtend[];
    total: number;
};

export const TasksList = ({ data, total }: Props) => {
    const workspaceId = useWorkspaceId();
    const { open } = useCreateTaskModal();

    return (
        <div className="col-span-1 flex flex-col gap-y-4">
            <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Tasks ({total})</p>
                    <Button variant="muted" size="icon" onClick={open}>
                        <Plus className="text-neutral-400" />
                    </Button>
                </div>
                <DotSeparator className="my-4" />
                <ul className="flex h-[50vh] flex-col gap-y-4 overflow-auto">
                    {data.map((task) => (
                        <li key={task.$id}>
                            <Link
                                href={`/workspaces/${workspaceId}/tasks/${task.$id}`}
                            >
                                <Card className="rounded-lg shadow-none transition hover:opacity-75">
                                    <CardContent className="p-4">
                                        <p className="truncate text-lg font-medium">
                                            {task.name}
                                        </p>
                                        <div className="flex items-center gap-x-2">
                                            <p>{task.project?.name}</p>
                                            <div className="size-1 rounded-full bg-neutral-300" />
                                            <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
                                                <CalendarIcon className="size-3" />
                                                <span className="truncate">
                                                    {formatDistanceToNow(
                                                        new Date(task.dueDate),
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </li>
                    ))}
                    <li className="hidden text-center text-sm text-muted-foreground first-of-type:block">
                        No tasks found
                    </li>
                </ul>
                <Button variant="muted" className="mt-4 w-full" asChild>
                    <Link href={`/workspaces/${workspaceId}/tasks`}>
                        View all tasks
                    </Link>
                </Button>
            </div>
        </div>
    );
};
