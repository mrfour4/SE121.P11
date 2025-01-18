import { api } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

const reset = api.workspace[":workspaceId"]["reset-code"].$post;

type RequestType = InferRequestType<typeof reset>;
type ResponseType = InferResponseType<typeof reset, 200>;

export const useResetInviteCode = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await reset({ param });

            if (!response.ok) {
                throw new Error("Failed to reset invite code");
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("Workspace invite code reset successfully");
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
            queryClient.invalidateQueries({
                queryKey: ["workspace", data.$id],
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
