"use client";

import { useRouter } from "next/navigation";

import { ChannelHeader } from "@/features/channels/components/channel-header";
import { ChatInput } from "@/features/channels/components/chat-input";
import { MessageList } from "@/features/messages/components/message-list";

import { Loader, TriangleAlert } from "lucide-react";

import { useCurrentChannel } from "@/features/channels/hooks/use-current-channel";
import { useGetMessages } from "@/features/messages/api/use-get-messages";

export default function ChannelIdPage() {
    const { isPending, data: channel } = useCurrentChannel();

    const { results, status, loadMore } = useGetMessages({
        channelId: channel?._id,
    });
    const router = useRouter();

    if (isPending || status === "LoadingFirstPage") {
        return (
            <div className="flex h-full flex-1 flex-col items-center justify-center">
                <Loader className="size-5 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!channel) {
        router.replace("/");
        return (
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-2">
                <TriangleAlert className="size-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                    Channel not found
                </p>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col">
            <ChannelHeader title={channel.name} />

            <MessageList
                channelName={channel.name}
                channelCreationTime={channel._creationTime}
                data={results}
                loadMore={loadMore}
                isLoadingMore={status === "LoadingMore"}
                canLoadMore={status === "CanLoadMore"}
            />

            <ChatInput placeholder="Message" />
        </div>
    );
}
