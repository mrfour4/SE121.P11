import { Attachment } from "@prisma/client";

import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

export const useCreateAttachment = (courseId: string) => {
    const mutation = useMutation({
        mutationFn: async (values: Partial<Attachment>) => {
            const res = await axiosClient.post<Attachment>(
                `/courses/${courseId}/attachments`,
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
