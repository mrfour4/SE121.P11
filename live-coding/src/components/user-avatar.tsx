import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import { LiveBadge } from "../features/stream/components/live-badge";

const avatarSizes = cva("", {
    variants: {
        size: {
            default: "size-8",
            lg: "size-14",
            xl: "size-20",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
    imageUrl: string;
    username: string;
    isLive?: boolean;
    showBadge?: boolean;
}

export const UserAvatar = ({
    imageUrl,
    username,
    isLive,
    showBadge,
    size,
}: UserAvatarProps) => {
    const canShowBadge = showBadge && isLive;

    return (
        <div className="relative">
            <Avatar
                className={cn(
                    isLive && "border border-background ring-2 ring-rose-500",
                    avatarSizes({ size }),
                )}
            >
                <AvatarImage src={imageUrl} className="object-cover" />
                <AvatarFallback>
                    {username[0]}
                    {username.at(-1)}
                </AvatarFallback>
            </Avatar>

            {canShowBadge && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 transform">
                    <LiveBadge />
                </div>
            )}
        </div>
    );
};

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
    return <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />;
};
