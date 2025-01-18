import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";

export const useFavoriteBoard = () => {
    const mutation = useMutation({
        mutationFn: useConvexMutation(api.board.favorite),

        onError: (error) => {
            console.log("🚀 ~ useFavoriteBoard ~ error:", error);
            toast.error("Failed to favorite board");
        },
    });

    return mutation;
};
