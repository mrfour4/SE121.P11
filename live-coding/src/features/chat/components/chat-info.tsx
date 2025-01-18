"use client";

import { Hint } from "@/components/hint";
import { Info } from "lucide-react";

type Props = {
    isDelayed: boolean;
    isFollowersOnly: boolean;
};

export const ChatInfo = ({ isDelayed, isFollowersOnly }: Props) => {
    const hint = getHint(isDelayed, isFollowersOnly);
    const label = getLabel(isDelayed, isFollowersOnly);

    if (!isDelayed && !isFollowersOnly) {
        return null;
    }

    return (
        <div className="flex w-full items-center gap-x-2 rounded-t-md border border-white/10 bg-white/5 p-2 text-muted-foreground">
            <Hint label={hint}>
                <Info className="size-4" />
            </Hint>
            <p className="text-xs font-semibold">{label}</p>
        </div>
    );
};

function getHint(isDelayed: boolean, isFollowersOnly: boolean) {
    if (isFollowersOnly && !isDelayed) {
        return "Only followers can chat";
    }

    if (isDelayed && !isFollowersOnly) {
        return "Messages are delayed by 3 seconds";
    }

    if (isDelayed && isFollowersOnly) {
        return "Only followers can chat and messages are delayed by 3 seconds";
    }

    return "";
}

function getLabel(isDelayed: boolean, isFollowersOnly: boolean) {
    if (isFollowersOnly && !isDelayed) {
        return "Followers Only";
    }

    if (isDelayed && !isFollowersOnly) {
        return "Slow mode";
    }

    if (isDelayed && isFollowersOnly) {
        return "Followers Only & Slow mode";
    }

    return "";
}
