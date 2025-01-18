"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import { ChatInfo } from "./chat-info";

import { cn } from "@/lib/utils";

type Props = {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    isHidden: boolean;
    isFollowing: boolean;
    isFollowerOnly: boolean;
    isDelayed: boolean;
};

export const ChatForm = ({
    value,
    onChange,
    onSubmit,
    isHidden,
    isFollowing,
    isFollowerOnly,
    isDelayed,
}: Props) => {
    const [isDelayBlocked, setIsDelayBlocked] = useState(false);

    const isFollowersOnlyAndNotFollowing = isFollowerOnly && !isFollowing;
    const isDisabled =
        isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!value || isDisabled) return;

        if (isDelayed && !isDelayBlocked) {
            setIsDelayBlocked(true);
            setTimeout(() => {
                setIsDelayBlocked(false);
                onSubmit();
            }, 3000);
        } else {
            onSubmit();
        }
    };

    if (isHidden) {
        return null;
    }

    return (
        <form
            className="flex flex-col items-center gap-y-4 p-3"
            onSubmit={handleSubmit}
        >
            <div className="w-full">
                <ChatInfo
                    isDelayed={isDelayed}
                    isFollowersOnly={isFollowerOnly}
                />
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={isDisabled}
                    placeholder="Send a message"
                    className={cn(
                        "border-white/10 bg-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0",
                        (isFollowerOnly || isDelayed) &&
                            "rounded-t-none border-t-0",
                    )}
                />
            </div>
            <div className="ml-auto">
                <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={isDisabled}
                >
                    Chat
                </Button>
            </div>
        </form>
    );
};

export const ChatFormSkeleton = () => {
    return (
        <div className="flex flex-col items-center gap-y-4 p-3">
            <Skeleton className="h-10 w-full" />
            <div className="ml-auto flex items-center gap-x-2">
                <Skeleton className="size-7" />
                <Skeleton className="h-7 w-12" />
            </div>
        </div>
    );
};
