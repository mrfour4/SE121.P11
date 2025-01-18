import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";

export const useCreateComment = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.comments.createComment),

        onError: (error) => {
            console.log("🚀 ~ useCreateComment ~ error:", error);
            toast.error("Failed to create comment");
        },
    });
};
