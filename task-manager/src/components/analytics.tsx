import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { AnalyticCard } from "./analytic-card";
import { DotSeparator } from "./dot-separator";

import { ProjectAnalytics } from "@/features/projects/api/use-get-project-analytics";

type Props = ProjectAnalytics;

export const Analytics = ({ data }: Props) => {
    return (
        <ScrollArea className="w-full shrink-0 whitespace-nowrap rounded-lg border">
            <div className="flex w-full flex-row">
                <div className="flex flex-1 items-center">
                    <AnalyticCard
                        title="Total tasks"
                        value={data.taskCount}
                        variant={data.taskDiff > 0 ? "up" : "down"}
                        increaseValue={data.taskDiff}
                    />
                    <DotSeparator direction="vertical" />
                </div>

                <div className="flex flex-1 items-center">
                    <AnalyticCard
                        title="Assigned tasks"
                        value={data.assignedTaskCount}
                        variant={data.assignedTaskDiff > 0 ? "up" : "down"}
                        increaseValue={data.assignedTaskDiff}
                    />
                    <DotSeparator direction="vertical" />
                </div>

                <div className="flex flex-1 items-center">
                    <AnalyticCard
                        title="Completed tasks"
                        value={data.completedTaskCount}
                        variant={data.completedTaskDiff > 0 ? "up" : "down"}
                        increaseValue={data.completedTaskDiff}
                    />
                    <DotSeparator direction="vertical" />
                </div>

                <div className="flex flex-1 items-center">
                    <AnalyticCard
                        title="Incomplete tasks"
                        value={data.incompleteTaskCount}
                        variant={data.incompleteTaskDiff > 0 ? "up" : "down"}
                        increaseValue={data.incompleteTaskDiff}
                    />
                    <DotSeparator direction="vertical" />
                </div>

                <div className="flex flex-1 items-center">
                    <AnalyticCard
                        title="Overdue tasks"
                        value={data.overdueTaskCount}
                        variant={data.overdueTaskDiff > 0 ? "up" : "down"}
                        increaseValue={data.overdueTaskDiff}
                    />
                </div>
            </div>

            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
};
