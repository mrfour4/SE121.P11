import { Attachment } from "@prisma/client";

import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

export const useDeleteAttachment = (courseId: string) => {
    const mutation = useMutation({
        mutationFn: async (id: Attachment["id"]) => {
            const res = await axiosClient.delete<Attachment>(
                `/courses/${courseId}/attachments/${id}`
            );

            return res.data;
        },
        onError() {
            toast.error("Something went wrong");
        },
    });

    return mutation;
};
