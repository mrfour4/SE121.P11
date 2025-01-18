import { Course } from "@prisma/client";
import { CreateFormValues } from "../components/form-create";

import { axiosClient } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

export const useCreateCourse = () => {
    const mutation = useMutation({
        mutationFn: async (values: CreateFormValues) => {
            const res = await axiosClient.post<Course>("/courses", values);

            return res.data;
        },
        onError() {
            toast.error("Something went wrong");
        },
    });

    return mutation;
};
