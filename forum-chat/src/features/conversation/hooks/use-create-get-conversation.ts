import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

export const useCreateOrGetConversation = () => {
    const mutation = useMutation({
        mutationFn: useConvexMutation(api.conversations.createOrGet),
    });

    return mutation;
};
