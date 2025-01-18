import { Chapter } from "@prisma/client";

import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

export const usePublishChapter = (courseId: string) => {
    const mutation = useMutation({
        mutationFn: async (id: Chapter["id"]) => {
            const res = await axiosClient.patch<Chapter>(
                `/courses/${courseId}/chapters/${id}/publish`
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
