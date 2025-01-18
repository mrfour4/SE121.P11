import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";

export const useCreateBoard = () => {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: useConvexMutation(api.board.create),
        onSuccess: (id) => {
            toast.success("Board created");
            router.push(`/board/${id}`);
        },
        onError: (error) => {
            console.log("🚀 ~ useCreateBoard ~ error:", error);
            toast.error("Failed to create board");
        },
    });

    return mutation;
};
