"use client";

import { LANGUAGES } from "@/features/dashboard/constants";
import { Language } from "@/types";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MessageSquare, User } from "lucide-react";

import { useGetSnippet } from "../api/use-get-snippet";
import { useSnippetId } from "../hooks/use-snippet-id";

import { formatDateTime } from "@/features/snippets/lib/utils";

export const Header = () => {
    const snippetId = useSnippetId();
    const { isPending, data: snippet } = useGetSnippet(snippetId);

    if (isPending) {
        return <HeaderSkeleton />;
    }

    return (
        <div className="rounded-xl border border-[#313244] bg-[#1e1e2e]/50 p-6 backdrop-blur-xl sm:p-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                    <Image
                        src={LANGUAGES[snippet?.language as Language].logo}
                        alt={`${snippet?.language} logo`}
                        width={48}
                        height={48}
                        className="size-12 h-full object-contain"
                    />
                    <div className="space-y-2">
                        <h1 className="text-xl font-semibold text-white sm:text-2xl">
                            {snippet?.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#8b8b8d] [&_svg]:size-4">
                            <div className="flex items-center gap-2">
                                <User />
                                <span>{snippet?.userName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock />
                                <span>
                                    {snippet?._creationTime &&
                                        formatDateTime(snippet?._creationTime)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageSquare />
                                <span>
                                    {/* {comments?.length} comments */}0
                                    comments
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <Badge
                    variant="secondary"
                    className="rounded-lg px-3 py-1 text-sm"
                >
                    {snippet?.language}
                </Badge>
            </div>
        </div>
    );
};

export const HeaderSkeleton = () => {
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
};
