import { useRouter } from "next/navigation";

import { api } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

const register = api.auth.register.$post;

type RequestType = InferRequestType<typeof register>["json"];
type ResponseType = InferResponseType<typeof register>;

export const useRegister = () => {
    const router = useRouter();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await register({ json });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "An error occurred");
            }

            return data;
        },
        onSuccess: () => {
            router.push("/");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
