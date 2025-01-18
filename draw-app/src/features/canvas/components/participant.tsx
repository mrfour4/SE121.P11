"use client";

import { MAX_SHOWN_PARTICIPANTS } from "../constant";

import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "../../../components/user-avatar";

import { useOthers, useSelf } from "@liveblocks/react/suspense";

export const Participant = () => {
    const users = useOthers();
    const currentUser = useSelf();
    const moreUsers = users.length - MAX_SHOWN_PARTICIPANTS;

    return (
        <div className="absolute right-2 top-2 flex h-12 items-center rounded-md bg-white p-3 shadow-md">
            <div className="flex gap-x-2">
                {users
                    .slice(0, MAX_SHOWN_PARTICIPANTS)
                    .map(({ info, connectionId }) => (
                        <UserAvatar
                            key={connectionId}
                            src={info?.picture}
                            name={info?.name}
                            fallback={info?.name?.[0] || "A"}
                        />
                    ))}

                {currentUser && (
                    <UserAvatar
                        src={currentUser.info?.picture}
                        name={`${currentUser.info?.name} (You)`}
                        fallback={currentUser.info?.name?.[0] || "A"}
                    />
                )}

                {moreUsers > 0 && (
                    <UserAvatar
                        name={`${moreUsers} more`}
                        fallback={`+${moreUsers}`}
                    />
                )}
            </div>
        </div>
    );
};

export const ParticipantSkeleton = () => {
    return (
        <div className="absolute right-2 top-2 flex h-12 items-center gap-x-2 rounded-md bg-white p-3 shadow-md">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
        </div>
    );
};
