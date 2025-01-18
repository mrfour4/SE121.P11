import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

import { ConvexError } from "convex/values";

export const useCreateMessage = () => {
    const mutation = useMutation({
        mutationFn: useConvexMutation(api.messages.create),
        onError: () => {
            throw new ConvexError("Fail to send message");
        },
    });

    return mutation;
};
