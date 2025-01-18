import { TaskExtend, TaskStatus } from "@/types";
import { BOARDS } from "../constants";
import { TaskState } from "../types";

export const getInitialTasks = (data: TaskExtend[]): TaskState => {
    const initialTasks: TaskState = BOARDS.reduce((acc, board) => {
        acc[board] = [];
        return acc;
    }, {} as TaskState);

    data.forEach((task) => {
        initialTasks[task.status].push(task);
    });

    Object.keys(initialTasks).forEach((key) => {
        initialTasks[key as TaskStatus].sort((a, b) => a.position - b.position);
    });

    return initialTasks;
};
