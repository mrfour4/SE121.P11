"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

import { handleFollow, handleUnfollow } from "@/actions/follow";
import { useAuth } from "@clerk/nextjs";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Props = {
    hostIdentity: string;
    isHost: boolean;
    isFollowing: boolean;
};

export const Actions = ({ hostIdentity, isHost, isFollowing }: Props) => {
    const [isPending, startTransition] = useTransition();

    const { userId } = useAuth();
    const router = useRouter();

    const onFollow = () => {
        startTransition(() => {
            handleFollow(hostIdentity).catch((error) => {
                toast.error("Failed to follow");
            });
        });
    };

    const onUnfollow = () => {
        startTransition(() => {
            handleUnfollow(hostIdentity).catch((error) => {
                toast.error("Failed to unfollow");
            });
        });
    };

    const onToggleFollow = () => {
        if (!userId) {
            return router.push("/sign-in");
        }

        if (isHost) return;

        if (isFollowing) {
            onUnfollow();
        } else {
            onFollow();
        }
    };

    return (
        <Button
            variant="primary"
            size="sm"
            className="w-full lg:w-auto"
            disabled={isPending || isHost}
            onClick={onToggleFollow}
        >
            <Heart className={cn(isFollowing ? "fill-white" : "fill-none")} />
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    );
};

export const ActionsSkeleton = () => {
    return <Skeleton className="h-10 w-full lg:w-24" />;
};
