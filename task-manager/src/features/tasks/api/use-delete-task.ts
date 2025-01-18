import { api } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

const remove = api.tasks[":taskId"].$delete;

type RequestType = InferRequestType<typeof remove>;
type ResponseType = InferResponseType<typeof remove, 200>;

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await remove({ param });

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("Task deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["task", data.$id] });
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
