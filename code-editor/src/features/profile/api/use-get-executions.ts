import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetUserExecutions = (userId: string) => {
    return usePaginatedQuery(
        api.codeExecutions.getUserExecutions,
        { userId },
        { initialNumItems: 3 },
    );
};
