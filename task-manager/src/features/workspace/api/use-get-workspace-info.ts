import { api } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaceInfo = (workspaceId: string) => {
    const query = useQuery({
        queryKey: ["workspace-info", workspaceId],
        queryFn: async () => {
            const response = await api.workspace[":workspaceId"].info.$get({
                param: { workspaceId },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch workspace info");
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};
