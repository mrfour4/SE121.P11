import { Skeleton } from "@/components/ui/skeleton";
import { ReceivedChatMessage } from "@livekit/components-react";

import { ChatMessage } from "./chat-message";

type Props = {
    messages: ReceivedChatMessage[];
    isHidden: boolean;
};

export const ChatList = ({ messages, isHidden }: Props) => {
    if (isHidden || !messages || messages.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    {isHidden ? "Chat is disabled" : "Welcome to chat"}
                </p>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-1 flex-col-reverse overflow-y-auto p-3">
            {messages.map((message) => (
                <ChatMessage key={message.id} data={message} />
            ))}
        </div>
    );
};

export const ChatListSkeleton = () => {
    return (
        <div className="flex h-full items-center justify-center">
            <Skeleton className="h-6 w-1/2" />
        </div>
    );
};
