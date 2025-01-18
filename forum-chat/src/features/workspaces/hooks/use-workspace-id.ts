import { useParams } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";

export const useWorkspaceId = () => {
    const { workspaceId } = useParams<{ workspaceId: Id<"workspaces"> }>();

    return workspaceId;
};
