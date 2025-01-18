"use client";

import { useEffect, useMemo, useState } from "react";

import { ChatCommunity } from "./chat-community";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatList, ChatListSkeleton } from "./chat-list";

import {
    useChat,
    useConnectionState,
    useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";

import { ChatVariant, useChatSidebar } from "@/stores/use-chat-sidebar";
import { useMediaQuery } from "usehooks-ts";

type Props = {
    hostName: string;
    hostIdentity: string;
    viewerName: string;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
};

export const Chat = ({
    hostName,
    hostIdentity,
    viewerName,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly,
}: Props) => {
    const isMobile = useMediaQuery("(max-width: 1024px)");
    const { variant, onExpand } = useChatSidebar();

    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);

    const isOnline =
        participant && connectionState === ConnectionState.Connected;
    const isHidden = !isChatEnabled || !isOnline;

    const [value, setValue] = useState("");
    const { chatMessages: messages, send } = useChat();

    useEffect(() => {
        if (isMobile) {
            onExpand();
        }
    }, [isMobile, onExpand]);

    const reversedMessages = useMemo(
        () => messages.sort((a, b) => b.timestamp - a.timestamp),
        [messages],
    );

    const onSubmit = () => {
        if (!send) return;

        send(value);
        setValue("");
    };

    const onChange = (value: string) => {
        setValue(value);
    };

    return (
        <div className="flex h-[calc(100vh-80px)] flex-col border-b border-l bg-background pt-0">
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
                <>
                    <ChatList messages={reversedMessages} isHidden={isHidden} />
                    <ChatForm
                        value={value}
                        onChange={onChange}
                        onSubmit={onSubmit}
                        isHidden={isHidden}
                        isFollowing={isFollowing}
                        isFollowerOnly={isChatFollowersOnly}
                        isDelayed={isChatDelayed}
                    />
                </>
            )}
            {variant === ChatVariant.COMMUNITY && (
                <ChatCommunity
                    hostName={hostName}
                    viewerName={viewerName}
                    isHidden={isHidden}
                />
            )}
        </div>
    );
};

export const ChatSkeleton = () => {
    return (
        <div className="flex h-[calc(100vh-80px)] flex-col border-2 border-b border-l pt-0">
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div>
    );
};
