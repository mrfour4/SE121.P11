import { Language } from "@/types";
import { VERSIONS } from "../constants/runtime";

import { axiosClient } from "@/lib/axios";
import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";
import { useRunCode } from "../hooks/use-run-code";

// https://github.com/engineer-man/piston

type Response = {
    language: string;
    version: string;
    run: {
        code: number;
        output: string;
        stderr: string;
        stdout: string;
    };
};

type Code = {
    language: Language;
    code: string;
};

export const useExecuteCode = () => {
    const { setIsRunning } = useRunCode();

    return useMutation({
        mutationFn: async ({ language, code }: Code) => {
            setIsRunning(true);
            const response = await axiosClient.post<Response>("/execute", {
                language,
                version: VERSIONS[language],
                files: [{ content: code }],
            });

            return response.data.run;
        },

        onError(error) {
            console.log("🚀 ~ onError: ~ error:", error);
            toast.error("Failed to execute code");
        },
        onSettled() {
            setIsRunning(false);
        },
    });
};
