"use client";

import {
    useConnectionState,
    useRemoteParticipant,
    useTracks,
} from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";

import { Skeleton } from "@/components/ui/skeleton";

import { LiveVideo } from "./live-video";
import { LoadingVideo } from "./loading-video";
import { OfflineVideo } from "./offline-video";

type Props = {
    hostName: string;
    hostIdentity: string;
};

export const Video = ({ hostIdentity, hostName }: Props) => {
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);
    const tracks = useTracks([
        Track.Source.Camera,
        Track.Source.Microphone,
    ]).filter((track) => track.participant.identity === hostIdentity);

    let content;

    if (!participant && connectionState === ConnectionState.Connected) {
        content = <OfflineVideo username={hostName} />;
    } else if (!participant || tracks.length === 0) {
        content = <LoadingVideo label={connectionState} />;
    } else {
        content = <LiveVideo participant={participant} />;
    }
    return (
        <div className="group relative aspect-video border-b">{content}</div>
    );
};

export const VideoSkeleton = () => {
    return (
        <div className="aspect-video border-x border-background">
            <Skeleton className="size-full rounded-none" />
        </div>
    );
};
