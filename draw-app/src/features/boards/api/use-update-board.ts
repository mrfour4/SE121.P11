import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";

export const useUpdateBoard = () => {
    const mutation = useMutation({
        mutationFn: useConvexMutation(api.board.update),
        onSuccess: () => {
            toast.success("Board updated");
        },
        onError: (error) => {
            console.log("🚀 ~ useUpdateBoard ~ error:", error);
            toast.error("Failed to update board");
        },
    });

    return mutation;
};
