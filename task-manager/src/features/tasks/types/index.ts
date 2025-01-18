import { TaskExtend, TaskStatus } from "@/types";

export type ProjectOption = {
    id: string;
    name: string;
    imageUrl: string;
};

export type MemberOption = {
    id: string;
    name: string;
};

export type TaskState = {
    [key in TaskStatus]: TaskExtend[];
};

export type UpdatePayload = {
    $id: string;
    status: TaskStatus;
    position: number;
};

export enum NAVIGATE {
    PREVIOUS = "PREVIOUS",
    NEXT = "NEXT",
    TODAY = "TODAY",
}
