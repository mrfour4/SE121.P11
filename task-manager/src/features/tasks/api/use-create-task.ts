import { api } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

const create = api.tasks.$post;

type RequestType = InferRequestType<typeof create>;
type ResponseType = InferResponseType<typeof create, 200>;

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
            const response = await create({ json });

            if (!response.ok) {
                throw new Error("Failed to create task");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("Task created successfully");
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
