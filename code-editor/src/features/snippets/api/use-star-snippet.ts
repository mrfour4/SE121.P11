import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";

export const useStarSnippet = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.snippets.starSnippet),
        onError: (error) => {
            console.log("🚀 ~ useStarSnippet ~ error:", error);
            toast.error("Failed to star snippet");
        },
    });
};
