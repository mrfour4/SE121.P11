import { useParams } from "next/navigation";

export const useProjectId = () => {
    const { projectId } = useParams<{ projectId: string }>();
    return projectId;
};
