import { api } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaces = () => {
    const query = useQuery({
        queryKey: ["workspaces"],
        queryFn: async () => {
            const response = await api.workspace.$get();

            if (!response.ok) {
                throw new Error("Failed to fetch workspaces");
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};
