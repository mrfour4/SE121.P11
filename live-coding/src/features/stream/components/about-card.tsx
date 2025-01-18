"use client";

import { VerifyMark } from "@/components/verify-mark";
import { BioModal } from "./bio-modal";

type Props = {
    hostName: string;
    hostIdentity: string;
    viewerIdentity: string;
    bio: string | null;
    followerCount: number;
};

export const AboutCard = ({
    hostName,
    hostIdentity,
    viewerIdentity,
    bio,
    followerCount,
}: Props) => {
    const hostAsViewer = `host-${hostIdentity}`;
    const isHost = viewerIdentity === hostAsViewer;

    const followedByLabel = followerCount === 1 ? "follower" : "followers";

    return (
        <div className="px-4">
            <div className="group flex flex-col gap-y-3 rounded-xl bg-background p-6 lg:p-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2 text-lg font-semibold lg:text-2xl">
                        About {hostName}
                        <VerifyMark />
                    </div>
                    {isHost && <BioModal initialValue={bio} />}
                </div>
                <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">
                        {followerCount}
                    </span>{" "}
                    {followedByLabel}
                </div>
                <p className="text-sm">
                    {bio ||
                        "This user prefers to keep an air of mystery about them."}
                </p>
            </div>
        </div>
    );
};
