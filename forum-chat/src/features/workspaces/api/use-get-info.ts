import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useWorkspaceInfo = (id: Id<"workspaces">) => {
    const query = useQuery(convexQuery(api.workspaces.getInfoById, { id }));

    return query;
};
