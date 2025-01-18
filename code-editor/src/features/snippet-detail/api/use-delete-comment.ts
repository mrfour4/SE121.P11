import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";

export const useDeleteComment = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.comments.deleteComment),
        onSuccess: () => {
            toast.success("Comment deleted successfully");
        },
        onError: (error) => {
            console.log("🚀 ~ useDeleteComment ~ error:", error);
            toast.error("Failed to delete comment");
        },
    });
};
