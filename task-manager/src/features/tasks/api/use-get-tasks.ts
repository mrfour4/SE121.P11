import { api } from "@/lib/rpc";
import { TaskStatus } from "@/types";
import { useQuery } from "@tanstack/react-query";

type Props = {
    workspaceId: string;
    projectId?: string | null;
    assigneeId?: string | null;
    status?: TaskStatus | null;
    dueDate?: string | null;
    search?: string | null;
};
export const useGetTasks = ({
    workspaceId,
    assigneeId,
    projectId,
    status,
    dueDate,
    search,
}: Props) => {
    const query = useQuery({
        queryKey: [
            "tasks",
            workspaceId,
            assigneeId,
            projectId,
            status,
            dueDate,
            search,
        ],
        queryFn: async () => {
            const response = await api.tasks.$get({
                query: {
                    workspaceId,
                    assigneeId: assigneeId ?? undefined,
                    projectId: projectId ?? undefined,
                    status: status ?? undefined,
                    dueDate: dueDate ?? undefined,
                    search: search ?? undefined,
                },
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
