import { LANGUAGES } from "@/features/dashboard/constants";
import { Language } from "@/types";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { LoadMoreButton } from "@/components/loade-more-button";
import { Code } from "lucide-react";
import { CodeBlock } from "./code-block";

import { formatDateTime } from "@/features/snippets/lib/utils";
import { cn } from "@/lib/utils";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useGetUserExecutions } from "../api/use-get-executions";

export const ExecutionsTab = () => {
    const { user } = useCurrentUser();
    const { results, status, isLoading, loadMore } = useGetUserExecutions(
        user?.userId ?? "",
    );

    if (status === "LoadingFirstPage") {
        return <ExecutionsTabSkeleton />;
    }

    return (
        <div className="space-y-6">
            {results?.map((execution) => (
                <div
                    key={execution._id}
                    className="group overflow-hidden rounded-xl transition-all duration-300"
                >
                    <div className="flex items-center justify-between rounded-t-xl border border-gray-800/50 bg-black/30 p-4">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur transition-opacity group-hover:opacity-30" />
                                <Image
                                    src={
                                        LANGUAGES[
                                            execution.language as Language
                                        ].logo
                                    }
                                    alt={execution.language}
                                    className="relative z-10 rounded-lg object-cover"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-white">
                                        {execution.language.toUpperCase()}
                                    </span>

                                    <span className="text-xs text-gray-400">
                                        -{" "}
                                        {formatDateTime(
                                            execution._creationTime,
                                        )}
                                    </span>
                                </div>
                                <Badge
                                    className={cn(
                                        "text-xs",
                                        execution.error
                                            ? "bg-red-500/10 text-red-400"
                                            : "bg-green-500/10 text-green-400",
                                    )}
                                >
                                    {execution.error ? "Error" : "Success"}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-b-xl border border-t-0 border-gray-800/50 bg-black/20 p-4">
                        <CodeBlock
                            language={execution.language}
                            code={execution.code}
                        />

                        {(execution.output || execution.error) && (
                            <div className="mt-4 rounded-lg bg-black/40 p-4">
                                <h4 className="mb-2 text-sm font-medium text-gray-400">
                                    Output
                                </h4>
                                <pre
                                    className={cn(
                                        "text-sm",
                                        execution.error
                                            ? "text-red-400"
                                            : "text-green-400",
                                    )}
                                >
                                    {execution.error || execution.output}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {status === "Exhausted" && results.length === 0 && (
                <div className="py-12 text-center">
                    <Code className="mx-auto mb-4 h-12 w-12 text-gray-600" />
                    <h3 className="mb-2 text-lg font-medium text-gray-400">
                        No code results yet
                    </h3>
                    <p className="text-gray-500">
                        Start coding to see your execution history!
                    </p>
                </div>
            )}

            <div className="flex justify-center">
                <LoadMoreButton
                    isLoading={isLoading}
                    onLoadMore={() => loadMore(1)}
                    status={status}
                />
            </div>
        </div>
    );
};

function ExecutionsTabSkeleton() {
    return (
        <div className="space-y-6 rounded-2xl border border-[#313244] bg-[#1e1e2e]/50 p-6 backdrop-blur-xl sm:p-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                    <Skeleton className="size-12" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <div className="flex gap-4">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-5 w-24" />
                        </div>
                    </div>
                </div>
            </div>
            <Skeleton className="h-[400px] rounded-xl" />
        </div>
    );
}
