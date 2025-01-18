import Image from "next/image";

import { Skeleton } from "./ui/skeleton";

import { LiveBadge } from "@/features/stream/components/live-badge";
import { UserAvatar } from "./user-avatar";

type Props = {
    src: string | null;
    fallback: string;
    isLive: boolean;
    username: string;
};

export const Thumbnail = ({ src, fallback, isLive, username }: Props) => {
    let content;

    if (!src) {
        content = (
            <div className="flex size-full flex-col items-center justify-center gap-y-4 rounded-md bg-background transition-transform group-hover:-translate-y-2 group-hover:translate-x-2">
                <UserAvatar
                    size="lg"
                    showBadge
                    username={username}
                    imageUrl={fallback}
                    isLive={isLive}
                />
            </div>
        );
    } else {
        content = (
            <Image
                src={src}
                fill
                alt="Thumbnail"
                className="rounded-md object-cover transition-transform group-hover:-translate-y-2 group-hover:translate-x-2"
            />
        );
    }

    return (
        <div className="group relative aspect-video cursor-pointer rounded-md">
            <div className="absolute inset-0 flex items-center justify-center rounded-md bg-blue-600 opacity-0 transition-opacity group-hover:opacity-100" />
            {content}
            {isLive && src && (
                <div className="absolute left-2 top-2 transition-transform group-hover:-translate-y-2 group-hover:translate-x-2">
                    <LiveBadge />
                </div>
            )}
        </div>
    );
};

export const ThumbnailSkeleton = () => {
    return (
        <div className="group relative aspect-video cursor-pointer rounded-xl">
            <Skeleton className="size-full" />
        </div>
    );
};
