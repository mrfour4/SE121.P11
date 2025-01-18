"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
    Activity,
    Code2,
    Mail,
    Star,
    Timer,
    TrendingUp,
    Trophy,
} from "lucide-react";

import { UserAvatar } from "@/components/user-avatar";
import { StatCard } from "./stat-card";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useGetStarredSnippets } from "../api/use-get-starred";
import { useGetUserStats } from "../api/use-get-stats";

export const Stats = () => {
    const { user } = useCurrentUser();
    const { data: userStats, isPending } = useGetUserStats(user?.userId ?? "");
    const { data: starredSnippets, isPending: starredPending } =
        useGetStarredSnippets();

    if (isPending || starredPending) {
        return <StatsSkeleton />;
    }

    return (
        <div className="mb-8 overflow-hidden rounded-2xl border border-gray-800/50 bg-gradient-to-br from-[#12121a] to-[#1a1a2e] p-8">
            <div className="flex items-center gap-8">
                <UserAvatar
                    src={user?.imageUrl}
                    className="size-16 lg:size-24"
                />

                <div>
                    <div className="mb-2 flex items-center gap-3">
                        <h1 className="text-xl font-bold text-white lg:text-3xl">
                            {user?.name}
                        </h1>
                    </div>
                    <p className="flex items-center gap-2 text-sm text-gray-400 lg:text-base">
                        <Mail className="h-4 w-4" />
                        {user?.email}
                    </p>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                <StatCard
                    label="Code Executions"
                    value={userStats?.totalExecutions ?? 0}
                    icon={Activity}
                    color="from-blue-500 to-cyan-500"
                    gradient="group-hover:via-blue-400"
                    description="Total code runs"
                    metric={{
                        label: "Last 24h",
                        value: userStats?.last24Hours ?? 0,
                        icon: Timer,
                    }}
                />
                <StatCard
                    label="Starred Snippets"
                    value={starredSnippets?.length ?? 0}
                    icon={Star}
                    color="from-yellow-500 to-orange-500"
                    gradient="group-hover:via-yellow-400"
                    description="Saved for later"
                    metric={{
                        label: "Most starred",
                        value: userStats?.mostStarredLanguage ?? "N/A",
                        icon: Trophy,
                    }}
                />
                <StatCard
                    label="Languages Used"
                    value={userStats?.languagesCount ?? 0}
                    icon={Code2}
                    color="from-purple-500 to-pink-500"
                    gradient="group-hover:via-purple-400"
                    description="Different languages"
                    metric={{
                        label: "Most used",
                        value: userStats?.favoriteLanguage ?? "N/A",
                        icon: TrendingUp,
                    }}
                />
            </div>
        </div>
    );
};

export function StatsSkeleton() {
    return (
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-gray-800/50 bg-gradient-to-br from-[#12121a] to-[#1a1a2e] p-8">
            <div className="relative flex items-center gap-8">
                <div className="relative">
                    <Skeleton className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-xl" />
                    <Skeleton className="relative z-10 h-24 w-24 rounded-full border-4 border-gray-800/50" />
                </div>

                <div className="space-y-3">
                    <Skeleton className="h-8 w-48 rounded" />
                    <Skeleton className="h-5 w-32 rounded" />
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="group relative overflow-hidden rounded-xl border border-gray-800/50 bg-gray-800/20 p-4"
                    >
                        <Skeleton className="absolute inset-0 bg-gradient-to-br opacity-5" />
                        <div className="relative space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24 rounded" />
                                    <Skeleton className="h-8 w-16 rounded" />
                                    <Skeleton className="h-4 w-32 rounded" />
                                </div>
                                <Skeleton className="h-10 w-10 rounded-xl" />
                            </div>

                            <div className="flex items-center gap-2 border-t border-gray-800/50 pt-4">
                                <Skeleton className="h-4 w-4 rounded" />
                                <Skeleton className="h-4 w-20 rounded" />
                                <Skeleton className="h-4 w-16 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
