import { api } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

const post = api.tasks["bulk-update"].$post;

type RequestType = InferRequestType<typeof post>;
type ResponseType = InferResponseType<typeof post, 200>;

export const useBulkUpdateTask = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await post({ json });

            if (!response.ok) {
                throw new Error("Failed to update tasks");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("Tasks updated successfully");
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["project-analytics"] });
            queryClient.invalidateQueries({
                queryKey: ["workspace-analytics"],
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
