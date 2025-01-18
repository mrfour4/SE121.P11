import { api } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetTask = (taskId: string) => {
    const query = useQuery({
        queryKey: ["task", taskId],
        queryFn: async () => {
            const response = await api.tasks[":taskId"].$get({
                param: { taskId },
            });

            if (!response.ok) {
                return null;
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};
