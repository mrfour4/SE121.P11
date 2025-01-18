import { Course } from "@prisma/client";

import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

export const usePublishCourse = () => {
    const mutation = useMutation({
        mutationFn: async (id: Course["id"]) => {
            const res = await axiosClient.patch<Course>(
                `/courses/${id}/publish`
            );

            return res.data;
        },
        onError(err) {
            console.log("🚀 ~ onError ~ err:", err);

            toast.error("Something went wrong");
        },
    });

    return mutation;
};
