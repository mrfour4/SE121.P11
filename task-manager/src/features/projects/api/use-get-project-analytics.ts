import { api } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

const get = api.projects[":projectId"].analytics.$get;

export type ProjectAnalytics = InferResponseType<typeof get, 200>;

export const useGetProjectAnalytics = (projectId: string) => {
    const query = useQuery({
        queryKey: ["project-analytics", projectId],
        queryFn: async () => {
            const response = await get({
                param: { projectId },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch project analytics");
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};
