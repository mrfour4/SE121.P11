"use client";

import { CopyButton } from "@/components/copy-button";
import { OutputArea } from "./output-area";

import { Terminal } from "lucide-react";

import { useGetLastExecution } from "../api/use-get-execute";

export const OutputPanel = () => {
    const { isPending, data } = useGetLastExecution();

    const output = data?.output;
    const error = data?.error;

    const hasContent = Boolean(output || error);

    return (
        <div className="rounded-xl bg-[#181825] p-6 ring-1 ring-gray-800/50">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex size-6 items-center justify-center rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
                        <Terminal className="size-4 text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                        Output
                    </span>
                </div>

                {hasContent && <CopyButton value={error || output} />}
            </div>

            <OutputArea isLoading={isPending} output={output} error={error} />
        </div>
    );
};
