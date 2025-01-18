import { useParams } from "next/navigation";

export const useTaskId = () => {
    const { taskId } = useParams<{ taskId: string }>();
    return taskId;
};
