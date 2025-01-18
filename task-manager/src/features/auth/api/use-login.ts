import { useRouter } from "next/navigation";

import { api } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

const login = api.auth.login.$post;

type RequestType = InferRequestType<typeof login>["json"];
type ResponseType = InferResponseType<typeof login>;

export const useLogin = () => {
    const router = useRouter();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await login({ json });
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
