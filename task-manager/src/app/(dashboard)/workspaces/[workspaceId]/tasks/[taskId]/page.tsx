"use client";

import { DotSeparator } from "@/components/dot-separator";
import { PageError } from "@/components/page-error";

import { TaskBreadcrumbs } from "@/features/tasks/components/task-breadcrumbs";
import { TaskDescription } from "@/features/tasks/components/task-description";
import { TaskPageLoading } from "@/features/tasks/components/task-loading";
import { TaskOverview } from "@/features/tasks/components/task-overview";

import { useGetTask } from "@/features/tasks/api/use-get-task";
import { useTaskId } from "@/features/tasks/hooks/use-task-id";

export default function TaskPage() {
    const taskId = useTaskId();
    const { data, isPending } = useGetTask(taskId);

    if (isPending) {
        return <TaskPageLoading />;
    }

    if (!data) {
        return <PageError message="Task not found" />;
    }

    return (
        <div className="flex flex-col">
            <TaskBreadcrumbs project={data.project} task={data} />
            <DotSeparator className="my-6" />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <TaskOverview task={data} />
                <TaskDescription task={data} />
            </div>
        </div>
    );
}
