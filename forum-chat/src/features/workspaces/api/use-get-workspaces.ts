import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

export const useGetWorkSpaces = () => {
    const query = useQuery(convexQuery(api.workspaces.get, {}));
    return query;
};
