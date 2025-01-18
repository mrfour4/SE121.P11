import { api } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

const update = api.members[":memberId"].$patch;

type RequestType = InferRequestType<typeof update>;
type ResponseType = InferResponseType<typeof update, 200>;

export const useUpdateMember = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param, json }) => {
            const response = await update({ param, json });

            if (!response.ok) {
                throw new Error("Failed to update member");
            }

            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("Member updated successfully");
            queryClient.invalidateQueries({ queryKey: ["members"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
