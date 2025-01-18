import { api } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

const create = api.projects.$post;

type RequestType = InferRequestType<typeof create>;
type ResponseType = InferResponseType<typeof create, 200>;

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ form }) => {
            const response = await create({ form });

            if (!response.ok) {
                throw new Error("Failed to create project");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("Project created successfully");
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
