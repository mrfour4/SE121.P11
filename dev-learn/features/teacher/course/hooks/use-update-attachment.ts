import { Attachment } from "@prisma/client";

import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

export const useUpdateAttachment = (courseId: string) => {
    const mutation = useMutation({
        mutationFn: async (values: Partial<Attachment>) => {
            const res = await axiosClient.patch<Attachment>(
                `/courses/${courseId}/attachments/${values.id}`,
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
