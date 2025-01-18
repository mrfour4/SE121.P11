import { api } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

const get = api.workspace[":workspaceId"].analytics.$get;

export type WorkspaceAnalytics = InferResponseType<typeof get, 200>;

export const useGetWorkspaceAnalytics = (workspaceId: string) => {
    const query = useQuery({
        queryKey: ["workspace-analytics", workspaceId],
        queryFn: async () => {
            const response = await get({
                param: { workspaceId },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch workspace analytics");
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};
