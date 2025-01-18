import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

export const useRemoveMember = () => {
    const mutation = useMutation({
        mutationFn: useConvexMutation(api.members.remove),
    });

    return mutation;
};
