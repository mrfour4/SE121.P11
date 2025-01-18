import Link from "next/link";

import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";

import { VerifyMark } from "@/components/verify-mark";
import { Prisma } from "@prisma/client";

import { formatDistanceToNow } from "date-fns";
import { getSearch } from "../service/get-search";

type Results = Prisma.PromiseReturnType<typeof getSearch>;

type Props = {
    data: Results[number];
};

export const ResultCard = ({ data }: Props) => {
    return (
        <Link href={`/${data.user.username}`}>
            <div className="flex w-full gap-x-4">
                <div className="relative h-36 w-64 flex-shrink-0">
                    <Thumbnail
                        src={data.thumbnailUrl}
                        fallback={data.user.imageUrl}
                        isLive={data.isLive}
                        username={data.user.username}
                    />
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="cursor-pointer text-lg font-bold hover:text-blue-500">
                            {data.user.username}
                        </p>
                        <VerifyMark />
                    </div>
                    <p className="truncate text-sm text-muted-foreground">
                        {data.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(data.updatedAt), {
                            addSuffix: true,
                        })}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export const ResultCardSkeleton = () => {
    return (
        <div className="flex w-full gap-x-4">
            <div className="relative h-36 w-64">
                <ThumbnailSkeleton />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-12" />
            </div>
        </div>
    );
};
