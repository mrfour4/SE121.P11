import { api } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetProjects = (workspaceId: string) => {
    const query = useQuery({
        queryKey: ["projects", workspaceId],
        queryFn: async () => {
            const response = await api.projects.$get({
                query: { workspaceId },
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
