import { Course } from "@prisma/client";

import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

export const useBulkDeleteCourses = () => {
    const mutation = useMutation({
        mutationFn: async (values: Array<Course["id"]>) => {
            const res = await axiosClient.post<Course>("/courses/bulk-delete", {
                ids: values,
            });

            return res.data;
        },
        onError() {
            toast.error("Something went wrong");
        },
    });

    return mutation;
};
