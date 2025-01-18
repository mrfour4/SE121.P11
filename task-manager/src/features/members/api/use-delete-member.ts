import { api } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

const remove = api.members[":memberId"].$delete;

type RequestType = InferRequestType<typeof remove>;
type ResponseType = InferResponseType<typeof remove, 200>;

export const useDeleteMember = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await remove({ param });

            if (!response.ok) {
                throw new Error("Failed to delete member");
            }

            return await response.json();
        },
        onSuccess: () => {
            toast.success("Member deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["members"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
