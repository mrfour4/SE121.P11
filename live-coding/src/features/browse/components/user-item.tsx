"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { UserAvatar } from "@/components/user-avatar";
import { LiveBadge } from "@/features/stream/components/live-badge";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/stores/use-sidebar";

type Props = {
    username: string;
    imageUrl: string;
    isLive?: boolean;
};

export const UserItem = ({ username, imageUrl, isLive }: Props) => {
    const pathname = usePathname();

    const { collapsed } = useSidebar();

    const href = `/${username}`;
    const isActive = pathname === href;

    return (
        <Button
            asChild
            variant="ghost"
            className={cn(
                "h-12 w-full",
                collapsed ? "justify-center" : "justify-start",
                isActive && "bg-accent",
            )}
        >
            <Link href={href}>
                <div
                    className={cn(
                        "flex w-full items-center gap-x-4",
                        collapsed && "justify-center",
                    )}
                >
                    <UserAvatar
                        imageUrl={imageUrl}
                        username={username}
                        isLive={isLive}
                    />
                    {!collapsed && <p className="truncate">{username}</p>}
                    {!collapsed && isLive && <LiveBadge className="ml-auto" />}
                </div>
            </Link>
        </Button>
    );
};

export const UserItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <Skeleton className="min-h-8 min-w-8 rounded-full" />
            <div className="flex-1">
                <Skeleton className="h-6" />
            </div>
        </li>
    );
};
