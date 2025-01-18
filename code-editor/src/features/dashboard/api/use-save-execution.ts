import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";

export const useSaveExecution = () => {
    return useMutation({
        mutationFn: useConvexMutation(api.codeExecutions.saveExecution),
        onError: (error) => {
            console.error("🚀 ~ useSaveExecution ~ error", error);
            toast.error("Failed to save execution");
        },
    });
};
