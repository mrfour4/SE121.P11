import { api } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetMembers = (workspaceId: string) => {
    const query = useQuery({
        queryKey: ["members", workspaceId],
        queryFn: async () => {
            const response = await api.members.$get({ query: { workspaceId } });

            if (!response.ok) {
                throw new Error("Failed to fetch members");
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};
