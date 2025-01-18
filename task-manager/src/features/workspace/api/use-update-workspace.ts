import { api } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

const patch = api.workspace[":workspaceId"].$patch;

type RequestType = InferRequestType<typeof patch>;
type ResponseType = InferResponseType<typeof patch, 200>;

export const useUpdateWorkspace = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form, param }) => {
            const response = await patch({ form, param });

            if (!response.ok) {
                throw new Error("Failed to update workspace");
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("Workspace created successfully");
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
