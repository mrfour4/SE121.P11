"use client";

import { Button } from "@/components/ui/button";

import { Hint } from "@/components/hint";
import { MessageSquare, Users } from "lucide-react";

import { ChatVariant, useChatSidebar } from "@/stores/use-chat-sidebar";

export const VariantToggle = () => {
    const { variant, onChangeVariant } = useChatSidebar();

    const isChat = variant === ChatVariant.CHAT;

    const Icon = isChat ? Users : MessageSquare;

    const onToggle = () => {
        const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
        onChangeVariant(newVariant);
    };

    const label = isChat ? "Community" : "Go back to chat";

    return (
        <Hint label={label} side="left" asChild>
            <Button
                onClick={onToggle}
                variant="ghost"
                className="h-auto p-2 hover:bg-white/10 hover:text-primary"
            >
                <Icon />
            </Button>
        </Hint>
    );
};
