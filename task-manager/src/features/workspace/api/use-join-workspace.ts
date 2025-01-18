import { api } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

const join = api.workspace[":workspaceId"]["join"].$post;

type RequestType = InferRequestType<typeof join>;
type ResponseType = InferResponseType<typeof join, 200>;

export const useJoinWorkspace = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param, json }) => {
            const response = await join({ param, json });

            if (!response.ok) {
                throw new Error("Failed to join workspace");
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("Workspace joined successfully");
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
