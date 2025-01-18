import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";

export const useUnFavoriteBoard = () => {
    const mutation = useMutation({
        mutationFn: useConvexMutation(api.board.unfavorite),

        onError: (error) => {
            console.log("🚀 ~ useUnFavoriteBoard ~ error:", error);
            toast.error("Failed to unfavorite board");
        },
    });

    return mutation;
};
