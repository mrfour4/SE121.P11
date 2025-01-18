import { api } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspace = (workspaceId: string) => {
    const query = useQuery({
        queryKey: ["workspace", workspaceId],
        queryFn: async () => {
            const response = await api.workspace[":workspaceId"].$get({
                param: { workspaceId },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch workspace");
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};
