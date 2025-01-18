import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";

export const useDeleteSnippet = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.snippets.deleteSnippet),
        onSuccess: () => {
            toast.success("Snippet deleted successfully");
        },
        onError: (error) => {
            console.log("🚀 ~ useDeleteSnippet ~ error:", error);
            toast.error("Failed to delete snippet");
        },
    });
};
