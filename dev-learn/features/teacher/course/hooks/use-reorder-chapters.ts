import { Attachment } from "@prisma/client";

import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { ReorderChapter } from "../types";

type UpdateData = {
    list: ReorderChapter[];
};

export const useReorderChapter = (courseId: string) => {
    const mutation = useMutation({
        mutationFn: async (values: UpdateData) => {
            const res = await axiosClient.put<Attachment>(
                `/courses/${courseId}/chapters/reorder`,
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
