"use client";

import { LocalParticipant, RemoteParticipant } from "livekit-client";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useParticipants } from "@livekit/components-react";
import { useDebounceValue } from "usehooks-ts";

import { CommunityItem } from "./community-item";

type Participant = RemoteParticipant | LocalParticipant;

type Props = {
    viewerName: string;
    hostName: string;
    isHidden: boolean;
};

export const ChatCommunity = ({ viewerName, hostName, isHidden }: Props) => {
    const [debouncedValue, setDebounceValue] = useDebounceValue("", 500);
    const [value, setValue] = useState("");

    const participants = useParticipants();

    const onChange = (newValue: string) => {
        setValue(newValue);
        setDebounceValue(newValue);
    };

    const filterParticipants = useMemo(() => {
        const deduped = participants.reduce((acc, participant) => {
            const hostAsViewer = `host-${participant.identity}`;
            if (!acc.some((p) => p.identity === hostAsViewer)) {
                acc.push(participant);
            }
            return acc;
        }, [] as Participant[]);

        return deduped.filter((participant) =>
            participant.name
                ?.toLowerCase()
                .includes(debouncedValue.toLowerCase().trim()),
        );
    }, [participants, debouncedValue]);

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Community is disabled
                </p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <Input
                className="border-white/10"
                placeholder="Search community"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <ScrollArea className="mt-4 gap-y-2">
                <p className="hidden p-2 text-center text-sm text-muted-foreground last:block">
                    No results
                </p>
                {filterParticipants.map((participant) => (
                    <CommunityItem
                        key={participant.identity}
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={participant.name}
                        participantIdentity={participant.identity}
                    />
                ))}
            </ScrollArea>
        </div>
    );
};
