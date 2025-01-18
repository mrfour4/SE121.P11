import { useParams } from "next/navigation";

export const useSnippetId = () => {
    const { snippetId } = useParams<{ snippetId: string }>();
    return snippetId;
};
