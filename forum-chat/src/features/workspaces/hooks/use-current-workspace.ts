import { useGetWorkSpace } from "../api/use-get-workspace";
import { useWorkspaceId } from "./use-workspace-id";

export const useCurrentWorkSpace = () => {
    const workspaceId = useWorkspaceId();
    const query = useGetWorkSpace({ id: workspaceId });

    return query;
};
