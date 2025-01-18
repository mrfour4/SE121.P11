import { Chapter } from "@prisma/client";

import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

export const useUnPublishChapter = (courseId: string) => {
    const mutation = useMutation({
        mutationFn: async (id: Chapter["id"]) => {
            const res = await axiosClient.patch<Chapter>(
                `/courses/${courseId}/chapters/${id}/unpublish`
            );

            return res.data;
        },
        onError() {
            toast.error("Something went wrong");
        },
    });

    return mutation;
};
