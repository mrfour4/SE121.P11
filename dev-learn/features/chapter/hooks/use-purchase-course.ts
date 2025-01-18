import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

export const usePurchaseCourse = () => {
    const mutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await axiosClient.post<{ url: string }>(
                `/courses/${id}/checkout`
            );
            return res.data;
        },
        onError() {
            toast.error("Something went wrong");
        },
    });
    return mutation;
};
