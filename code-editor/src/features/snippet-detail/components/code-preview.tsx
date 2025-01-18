"use client";

import { Language, Theme } from "@/types";

import { Skeleton } from "@/components/ui/skeleton";
import { Code } from "lucide-react";

import { CopyButton } from "@/components/copy-button";
import { CodeEditor } from "@/components/editor";

import { useGetSnippet } from "../api/use-get-snippet";
import { useSnippetId } from "../hooks/use-snippet-id";

export const CodePreview = () => {
    const snippetId = useSnippetId();
    const { isPending, data } = useGetSnippet(snippetId);

    if (isPending) {
        return null;
    }

    return (
        <div className="overflow-hidden rounded-xl border border-[#313244] bg-[#1e1e2e]/50">
            <div className="flex items-center justify-between border-b border-[#313244]/50 p-4 sm:px-6">
                <div className="flex items-center gap-2">
                    <Code className="size-4" />
                    <span className="text-sm font-medium text-gray-300">
                        Source Code
                    </span>
                </div>
                <CopyButton value={data?.code} />
            </div>
            {data && (
                <div className="h-[600px]">
                    <CodeEditor
                        readonly
                        language={data.language as Language}
                        theme={Theme.Dracula}
                        value={data.code}
                    />
                </div>
            )}
        </div>
    );
};

function CodePreviewSkeleton() {
    return (
        <div className="overflow-hidden rounded-xl border border-[#313244] bg-[#1e1e2e]/50">
            <div className="flex items-center justify-between border-b border-[#313244]/50 p-4 sm:px-6">
                <div className="flex items-center gap-2">
                    <Code className="size-4" />
                    <span className="text-sm font-medium text-gray-300">
                        Source Code
                    </span>
                </div>
                <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-[600px] w-full" />
        </div>
    );
}
