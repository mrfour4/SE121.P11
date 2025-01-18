"use client";

import { useEffect, useRef, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { GetMessagesReturnType } from "../api/use-get-messages";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { ConversationHero } from "@/features/conversation/components/conversation-hero";
import { ChannelHero } from "./channel-hero";
import { Message } from "./message";

import { Loader } from "lucide-react";

import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useModalStore } from "@/providers/modal-store-provider";
import { useInView } from "react-intersection-observer";

import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";

type Props = {
    memberName?: string;
    memberImage?: string;
    channelName?: string;
    channelCreationTime?: number;
    variant?: "channel" | "thread" | "conversation";
    data: GetMessagesReturnType | undefined;
    loadMore: () => void;
    isLoadingMore: boolean;
    canLoadMore: boolean;
};

const TIME_THRESHOLD = 5;

const formatDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);

    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";

    return format(date, "EEEE, MMMM d");
};

export const MessageList = ({
    memberImage,
    memberName,
    channelName,
    channelCreationTime,
    variant = "channel",
    data,
    loadMore,
    isLoadingMore,
    canLoadMore,
}: Props) => {
    const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);

    const bottomRef = useRef<HTMLDivElement>(null);

    const triggerScroll = useModalStore((state) => state.triggerScroll);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [triggerScroll]);

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && canLoadMore) {
            loadMore();
        }
    }, [inView, canLoadMore, loadMore]);

    const { data: currentMember } = useCurrentMember();

    if (!data) return null;

    const groupedMessages = data?.reduce(
        (group, message) => {
            const dateKey = format(message._creationTime, "yyyy-MM-dd");

            if (!group[dateKey]) {
                group[dateKey] = [];
            }

            group[dateKey].unshift(message);

            return group;
        },
        {} as Record<string, typeof data>,
    );

    return (
        <ScrollArea className="flex-1 pb-4">
            <div className="flex h-full flex-col-reverse">
                <div ref={bottomRef} className="h-1"></div>

                {Object.entries(groupedMessages).map(([dateKey, messages]) => (
                    <div key={dateKey} className="space-y-2">
                        <div className="relative my-2 text-center">
                            <Separator className="absolute left-0 right-0 top-1/2" />
                            <span className="relative inline-block rounded-full border border-gray-300 bg-white px-4 py-1 text-xs shadow-sm">
                                {formatDateLabel(dateKey)}
                            </span>
                        </div>

                        {messages?.map((message, index) => {
                            const prevMessage = messages[index - 1];

                            const isCompact =
                                prevMessage &&
                                prevMessage.user._id === message.user._id &&
                                differenceInMinutes(
                                    message._creationTime,
                                    prevMessage._creationTime,
                                ) < TIME_THRESHOLD;

                            return (
                                <Message
                                    key={message._id}
                                    id={message._id}
                                    memberId={message.memberId}
                                    authorImage={message.user.imageUrl}
                                    authorName={message.user.name}
                                    isAuthor={
                                        message.memberId === currentMember?._id
                                    }
                                    reactions={message.reactions}
                                    body={message.body}
                                    image={message.image}
                                    updateAt={message.updateAt}
                                    createAt={message._creationTime}
                                    isEditing={editingId === message._id}
                                    setEditing={setEditingId}
                                    isCompact={isCompact}
                                    hideThreadButton={variant === "thread"}
                                    threadCount={message.threadCount}
                                    threadName={message.threadName}
                                    threadImage={message.threadImage}
                                    threadTimestamp={message.threadTimestamp}
                                />
                            );
                        })}
                    </div>
                ))}

                {isLoadingMore && (
                    <div className="relative my-2 text-center">
                        <Separator className="absolute left-0 right-0 top-1/2" />
                        <span className="relative inline-block rounded-full border border-gray-300 bg-white px-4 py-1 text-xs shadow-sm">
                            <Loader className="size-4 animate-spin" />
                        </span>
                    </div>
                )}

                {variant === "channel" &&
                    channelName &&
                    channelCreationTime && (
                        <ChannelHero
                            name={channelName}
                            createTime={channelCreationTime}
                        />
                    )}

                {variant === "conversation" && (
                    <ConversationHero name={memberName} image={memberImage} />
                )}

                <div className="h-1" ref={ref}>
                    <p className="sr-only">Load more message</p>
                </div>
            </div>
        </ScrollArea>
    );
};
