import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

export const useCurrentMember = () => {
    const workspaceId = useWorkspaceId();

    const query = useQuery(convexQuery(api.members.current, { workspaceId }));

    return query;
};
