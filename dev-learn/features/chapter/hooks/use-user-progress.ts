import { UserProgress } from "@prisma/client";

import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

type Props = {
    courseId: string;
    chapterId: string;
};

export const useUserProgress = ({ courseId, chapterId }: Props) => {
    const mutation = useMutation({
        mutationFn: async (values: Partial<UserProgress>) => {
            const res = await axiosClient.put<UserProgress>(
                `/courses/${courseId}/chapters/${chapterId}/progress`,
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
