import { Course } from "@prisma/client";

import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

export const useDeleteCourse = () => {
    const mutation = useMutation({
        mutationFn: async (id: Course["id"]) => {
            const res = await axiosClient.delete<Course>(`/courses/${id}`);

            return res.data;
        },
        onError() {
            toast.error("Something went wrong");
        },
    });

    return mutation;
};
