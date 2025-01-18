import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";

export const useShareSnippet = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.snippets.createSnippet),
        onError: (error) => {
            console.log("🚀 ~ useShareSnippet ~ error:", error);
            toast.error("Failed to share snippet");
        },
    });
};
