import { api } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useCurrent = () => {
    const query = useQuery({
        queryKey: ["current"],
        queryFn: async () => {
            const response = await api.auth.current.$get();

            if (!response.ok) {
                return null;
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
};
