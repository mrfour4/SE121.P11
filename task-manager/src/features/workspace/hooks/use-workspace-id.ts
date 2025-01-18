import { useParams } from "next/navigation";

export const useWorkspaceId = () => {
    const { workspaceId } = useParams<{ workspaceId: string }>();
    return workspaceId;
};
