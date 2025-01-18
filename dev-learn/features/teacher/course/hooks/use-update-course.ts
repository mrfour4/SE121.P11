import { Course } from "@prisma/client";

import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

export const useUpdateCourse = (id: string) => {
    const mutation = useMutation({
        mutationFn: async (values: Partial<Course>) => {
            const res = await axiosClient.patch<Course>(
                `/courses/${id}`,
                values
            );

            return res.data;
        },
        onError() {
            toast.error("Something went wrong");
        },
    });

    return mutation;
};
