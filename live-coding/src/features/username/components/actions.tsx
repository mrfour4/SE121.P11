"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { handleBlock, handleUnblock } from "@/actions/block";
import { handleFollow, handleUnfollow } from "@/actions/follow";
import { toast } from "sonner";

type Props = {
    isFollowing: boolean;
    userId: string;
};

export const Actions = ({ isFollowing, userId }: Props) => {
    const [isPending, startTransition] = useTransition();

    const onFollow = () => {
        startTransition(() => {
            handleFollow(userId).catch((error) => {
                toast.error(error.message);
            });
        });
    };

    const onUnfollow = () => {
        startTransition(() => {
            handleUnfollow(userId).catch((error) => {
                toast.error(error.message);
            });
        });
    };

    const onBlock = () => {
        startTransition(() => {
            handleBlock(userId).catch((error) => {
                toast.error(error.message);
            });
        });
    };

    const onUnblock = () => {
        startTransition(() => {
            handleUnblock(userId).catch((error) => {
                toast.error(error.message);
            });
        });
    };

    const onFollowAction = isFollowing ? onUnfollow : onFollow;
    const onBlockAction = isFollowing ? onBlock : onUnblock;

    return (
        <Button variant="primary" disabled={isPending} onClick={onFollowAction}>
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    );
};
