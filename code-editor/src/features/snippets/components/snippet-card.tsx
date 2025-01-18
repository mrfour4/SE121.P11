"use client";

import { LANGUAGES } from "@/features/dashboard/constants";
import { Language, Snippet } from "@/types";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { Clock, User } from "lucide-react";
import { DeleteSnippet } from "./delete-snippet";
import { StarButton } from "./star-button";

import { useCurrentUser } from "@/hooks/use-current-user";
import { formatDateTime } from "../lib/utils";

type Props = {
    snippet: Snippet;
};

export const SnippetCard = ({ snippet }: Props) => {
    const { user } = useCurrentUser();

    const router = useRouter();
    const onClick = () => {
        router.push(`/snippets/${snippet._id}`);
    };

    return (
        <Card className="group">
            <CardHeader>
                <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div
                                className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur transition-all duration-500 group-hover:opacity-30"
                                area-hidden="true"
                            />
                            <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-2 transition-all duration-500 group-hover:from-blue-500/20 group-hover:to-purple-500/20">
                                <Image
                                    src={
                                        LANGUAGES[snippet.language as Language]
                                            .logo
                                    }
                                    alt={`${snippet.language} logo`}
                                    className="size-6 object-contain"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Badge>{snippet.language}</Badge>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="size-3" />

                                {formatDateTime(snippet._creationTime)}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <StarButton id={snippet._id} />
                        {user?._id === snippet.userId && (
                            <DeleteSnippet id={snippet._id} />
                        )}
                    </div>
                </div>
                <div onClick={onClick} className="cursor-pointer space-y-2">
                    <CardTitle className="truncate text-xl group-hover:text-blue-400">
                        {snippet.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                        <div className="rounded-md bg-gray-800 p-1">
                            <User className="size-3" />
                        </div>
                        <span className="max-w-[150px] truncate text-xs">
                            {snippet.userName}
                        </span>
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent onClick={onClick}>
                <div className="group/code relative cursor-pointer">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/15 to-purple-500/5 opacity-0 transition-all group-hover/code:opacity-100" />
                    <pre className="relative line-clamp-3 overflow-hidden rounded-lg bg-black/30 p-4 font-mono text-sm text-gray-300">
                        {snippet.code}
                    </pre>
                </div>
            </CardContent>
        </Card>
    );
};

export const SnippetCardSkeleton = () => {
    return (
        <Card className="h-[280px] overflow-hidden rounded-xl border border-[#313244]/50 bg-[#1e1e2e]/80">
            <CardHeader className="flex-row items-start justify-between p-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="size-10" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
                <Skeleton className="h-8 w-16" />
            </CardHeader>

            <CardContent className="space-y-2">
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
            </CardContent>

            <CardFooter>
                <div className="flex flex-1 flex-col gap-y-2 rounded-lg bg-black/30 p-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </CardFooter>
        </Card>
    );
};
