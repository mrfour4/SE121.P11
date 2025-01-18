import { Chapter } from "@prisma/client";

import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

type Props = {
    courseId: string;
    id: string;
};

export const useUpdateChapter = ({ courseId, id }: Props) => {
    const mutation = useMutation({
        mutationFn: async (values: Partial<Chapter>) => {
            const res = await axiosClient.patch<Chapter>(
                `/courses/${courseId}/chapters/${id}`,
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
