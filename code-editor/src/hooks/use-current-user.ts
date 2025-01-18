import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useCurrentUser = () => {
    const { isLoading, isAuthenticated } = useConvexAuth();
    const user = useQuery(api.users.current);

    return {
        isLoading: isLoading || (isAuthenticated && user === null),
        isAuthenticated: isAuthenticated && user !== null,
        user,
    };
};
