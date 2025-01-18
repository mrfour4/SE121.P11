import { api } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

const remove = api.workspace[":workspaceId"].$delete;

type RequestType = InferRequestType<typeof remove>;
type ResponseType = InferResponseType<typeof remove, 200>;

export const useDeleteWorkspace = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await remove({ param });

            if (!response.ok) {
                throw new Error("Failed to delete workspace");
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("Workspace deleted successfully");
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
