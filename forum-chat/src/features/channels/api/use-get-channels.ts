import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const useGetChannels = () => {
    const workspaceId = useWorkspaceId();

    const query = useQuery(convexQuery(api.channels.get, { workspaceId }));

    return query;
};
