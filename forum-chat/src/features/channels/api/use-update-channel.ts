import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { ConvexError } from "convex/values";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";

export const useUpdateChannel = () => {
    const mutation = useMutation({
        mutationFn: useConvexMutation(api.channels.update),
        onError: (error) => {
            const errorMessage =
                error instanceof ConvexError
                    ? error.data
                    : "Unexpected error occurred";

            toast.error(errorMessage);
        },
    });

    return mutation;
};
