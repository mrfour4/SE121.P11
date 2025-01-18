import { useRouter } from "next/navigation";

import { api } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export const useLogout = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async () => {
            const response = await api.auth.logout.$post();

            if (!response.ok) {
                throw new Error("Failed to logout");
            }
        },
        onSuccess: () => {
            toast.success("Logged out successfully");
            queryClient.invalidateQueries();
            router.push("/sign-in");
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return mutation;
};
