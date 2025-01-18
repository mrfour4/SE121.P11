"use client";

import { Id } from "../../../../../../convex/_generated/dataModel";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Conversation } from "@/features/conversation/components/conversation";

import { Loader, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

import { useCreateOrGetConversation } from "@/features/conversation/hooks/use-create-get-conversation";
import { useMemberId } from "@/features/members/hooks/use-member-id";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export default function MemberIdPage() {
    const memberId = useMemberId();
    const workspaceId = useWorkspaceId();

    const [conversationId, setConversationId] =
        useState<Id<"conversations"> | null>(null);

    const { mutate, isPending } = useCreateOrGetConversation();
    const router = useRouter();

    useEffect(() => {
        mutate(
            {
                workspaceId,
                memberId,
            },
            {
                onSuccess: (data) => {
                    setConversationId(data);
                },
                onError: () => {
                    toast.error("Fail to create or get conversation");
                    router.replace("/");
                },
            },
        );
    }, [workspaceId, memberId, mutate, router]);

    if (isPending) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader className="size-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!conversationId) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-y-2">
                <TriangleAlert className="size-6 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                    Conversation not found
                </p>
            </div>
        );
    }

    return <Conversation id={conversationId} />;
}
