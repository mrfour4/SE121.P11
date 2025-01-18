"use client";

import { Prisma } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

import { useSidebar } from "@/stores/use-sidebar";
import { useMediaQuery } from "usehooks-ts";

import { getFollowers } from "@/features/username/service/get-followers";

type Props = {
    data: Prisma.PromiseReturnType<typeof getFollowers>;
};

export const Following = ({ data }: Props) => {
    const { collapsed } = useSidebar();
    const isMobile = useMediaQuery("(max-width: 1024px)");

    if (!data.length) {
        return null;
    }

    return (
        <div>
            {!collapsed && !isMobile && (
                <div className="mb-4 pl-6">
                    <p className="text-sm text-muted-foreground">Following</p>
                </div>
            )}

            <ul className="space-y-2 px-2">
                {data.map((follow) => (
                    <li key={follow.id}>
                        <UserItem
                            username={follow.following.username}
                            imageUrl={follow.following.imageUrl}
                            isLive={follow.following.stream?.isLive}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const FollowingSkeleton = () => {
    return (
        <ul className="px-2 pt-2 lg:pt-0">
            {[...Array(3)].map((_, index) => (
                <UserItemSkeleton key={index} />
            ))}
        </ul>
    );
};
