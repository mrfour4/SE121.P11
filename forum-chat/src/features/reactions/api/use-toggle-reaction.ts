import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

export const useToggleReaction = () => {
    const mutation = useMutation({
        mutationFn: useConvexMutation(api.reactions.toggle),
    });

    return mutation;
};
