import { Prisma } from "@prisma/client";
import Link from "next/link";

import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";

import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";

import { getStreams } from "../service/get-streams";

type Results = Prisma.PromiseReturnType<typeof getStreams>;

type Props = {
    data: Results[number];
};

export const ResultCard = ({ data }: Props) => {
    return (
        <Link href={`/${data.user.username}`}>
            <div className="size-full space-y-4">
                <Thumbnail
                    src={data.thumbnailUrl}
                    fallback={data.user.imageUrl}
                    isLive={data.isLive}
                    username={data.user.username}
                />
                <div className="flex gap-x-3">
                    <UserAvatar
                        username={data.user.username}
                        imageUrl={data.user.imageUrl}
                        isLive={data.isLive}
                    />
                    <div className="flex flex-col overflow-hidden text-sm">
                        <p className="truncate font-semibold hover:text-blue-500">
                            {data.name}
                        </p>
                        <p className="text-muted-foreground">
                            {data.user.username}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export const ResultCardSkeleton = () => {
    return (
        <div className="size-full space-y-4">
            <ThumbnailSkeleton />
            <div className="flex gap-x-3">
                <UserAvatarSkeleton />
                <div className="flex flex-col gap-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>
        </div>
    );
};
