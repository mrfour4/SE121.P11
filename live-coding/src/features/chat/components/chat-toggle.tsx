"use client";

import { Button } from "@/components/ui/button";

import { Hint } from "@/components/hint";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { useChatSidebar } from "@/stores/use-chat-sidebar";

export const ChatToggle = () => {
    const { collapsed, onExpand, onCollapse } = useChatSidebar();

    const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

    const onToggle = () => {
        if (collapsed) {
            onExpand();
        } else {
            onCollapse();
        }
    };

    const label = collapsed ? "Expand" : "Collapse";

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
