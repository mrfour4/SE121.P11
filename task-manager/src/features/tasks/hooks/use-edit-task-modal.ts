import { parseAsString, useQueryState } from "nuqs";

export const useEditTaskModal = () => {
    const [taskId, setTaskId] = useQueryState("edit-task", parseAsString);
    const open = (taskId: string) => setTaskId(taskId);
    const close = () => setTaskId(null);
    return {
        taskId,
        open,
        close,
        setTaskId,
    };
};
