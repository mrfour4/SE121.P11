"use client";

import { Skeleton } from "@/components/ui/skeleton";

import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { VerifyMark } from "@/components/verify-mark";

import { User } from "lucide-react";
import { Actions, ActionsSkeleton } from "./actions";

import {
    useParticipants,
    useRemoteParticipant,
} from "@livekit/components-react";

type Props = {
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    imageUrl: string;
    isFollowing: boolean;
    name: string;
};

export const Header = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    imageUrl,
    isFollowing,
    name,
}: Props) => {
    const participants = useParticipants();
    const participant = useRemoteParticipant(hostIdentity);

    const isLive = !!participant;
    const participantCount = participants.length - 1;

    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    return (
        <div className="flex flex-col items-start justify-between gap-y-4 px-4 lg:flex-row lg:gap-y-0">
            <div className="flex items-center gap-x-3">
                <UserAvatar
                    imageUrl={imageUrl}
                    username={hostName}
                    size="lg"
                    isLive={isLive}
                    showBadge
                />
                <div className="space-y-1">
                    <div className="flex items-center gap-x-2">
                        <h2 className="text-lg font-semibold">{hostName}</h2>
                        <VerifyMark />
                    </div>
                    <p className="text-sm font-semibold">{name}</p>
                    {isLive ? (
                        <div className="flex items-center gap-x-1 text-xs font-semibold text-rose-500">
                            <User className="size-4" />
                            <p>
                                {participantCount}{" "}
                                {participantCount === 1 ? "viewer" : "viewers"}
                            </p>
                        </div>
                    ) : (
                        <p className="text-xs font-semibold text-muted-foreground">
                            Offline
                        </p>
                    )}
                </div>
            </div>
            <Actions
                isHost={isHost}
                hostIdentity={hostIdentity}
                isFollowing={isFollowing}
            />
        </div>
    );
};

export const HeaderSkeleton = () => {
    return (
        <div className="flex flex-col items-start justify-between gap-y-4 px-4 lg:flex-row lg:gap-y-0">
            <div className="flex items-center gap-x-2">
                <UserAvatarSkeleton size="lg" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
            <ActionsSkeleton />
        </div>
    );
};
