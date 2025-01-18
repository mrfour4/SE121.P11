import { api } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

const patch = api.tasks[":taskId"].$patch;

type RequestType = InferRequestType<typeof patch>;
type ResponseType = InferResponseType<typeof patch, 200>;

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json, param }) => {
            const response = await patch({ json, param });

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("Task updated successfully");
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({
                queryKey: ["task", data.$id],
            });
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
