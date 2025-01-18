import { Chapter } from "@prisma/client";

import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

export const useCreateChapter = (courseId: string) => {
    const mutation = useMutation({
        mutationFn: async (values: Partial<Chapter>) => {
            const res = await axiosClient.post<Chapter>(
                `/courses/${courseId}/chapters`,
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
