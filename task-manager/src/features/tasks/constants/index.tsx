import { TaskStatus } from "@/types";
import {
    Circle,
    CircleCheck,
    CircleDashed,
    CircleDot,
    CircleDotDashed,
} from "lucide-react";

export const STATUS_ICON_MAP: Record<TaskStatus, React.ReactNode> = {
    [TaskStatus.BACKLOG]: (
        <CircleDashed className="size-[18px] text-gray-400" />
    ),
    [TaskStatus.TODO]: <Circle className="size-[18px] text-red-400" />,
    [TaskStatus.IN_PROGRESS]: (
        <CircleDotDashed className="size-[18px] text-yellow-400" />
    ),
    [TaskStatus.IN_REVIEW]: <CircleDot className="size-[18px] text-blue-400" />,
    [TaskStatus.DONE]: <CircleCheck className="size-[18px] text-emerald-400" />,
};

export const STATUS_COLOR_MAP: Record<TaskStatus, string> = {
    [TaskStatus.BACKLOG]: "border-l-gray-500",
    [TaskStatus.TODO]: "border-l-red-500",
    [TaskStatus.IN_PROGRESS]: "border-l-yellow-500",
    [TaskStatus.IN_REVIEW]: "border-l-blue-500",
    [TaskStatus.DONE]: "border-l-emerald-500",
};

export const BOARDS: TaskStatus[] = [
    TaskStatus.BACKLOG,
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.IN_REVIEW,
    TaskStatus.DONE,
];

export const MAX_POSITION = 1_000_000;
export const POSITION_STEP = 1000;
