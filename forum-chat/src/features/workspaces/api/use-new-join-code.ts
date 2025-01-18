import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";

import { ConvexError } from "convex/values";
import { api } from "../../../../convex/_generated/api";

import { toast } from "sonner";

export const useNewJoinCode = () => {
    const mutation = useMutation({
        mutationFn: useConvexMutation(api.workspaces.newJoinCode),
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
