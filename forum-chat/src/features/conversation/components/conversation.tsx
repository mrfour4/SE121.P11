"use client";

import { Id } from "../../../../convex/_generated/dataModel";

import { MessageList } from "@/features/messages/components/message-list";
import { ChatInput } from "./chat-input";
import { ConversationHeader } from "./conversation-header";

import { Loader } from "lucide-react";

import { useGetMemberById } from "@/features/members/api/use-get-member-by-id";
import { useMemberId } from "@/features/members/hooks/use-member-id";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import { usePanel } from "@/features/messages/hooks/use-panel";

type Props = {
    id: Id<"conversations">;
};

export const Conversation = ({ id }: Props) => {
    const memberId = useMemberId();
    const { onOpenProfile } = usePanel();

    const { isPending, data: member } = useGetMemberById(memberId);
    const { results, status, loadMore } = useGetMessages({
        conversationId: id,
    });

    if (isPending || status === "LoadingFirstPage") {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader className="size-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col">
            <ConversationHeader
                memberImage={member?.user.imageUrl}
                memberName={member?.user.name}
                onClick={() => onOpenProfile(memberId)}
            />

            <MessageList
                data={results}
                variant="conversation"
                memberImage={member?.user.imageUrl}
                memberName={member?.user.name}
                loadMore={loadMore}
                isLoadingMore={status === "LoadingMore"}
                canLoadMore={status === "CanLoadMore"}
            />

            <ChatInput
                placeholder={`Message ${member?.user.name}`}
                conversationId={id}
            />
        </div>
    );
};
