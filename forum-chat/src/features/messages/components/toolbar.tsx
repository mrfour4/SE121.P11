"use client";

import { EmojiPopover } from "@/components/emoji-popover";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

import { MessageSquareText, Pencil, Smile, Trash } from "lucide-react";

type Props = {
    isAuthor: boolean;
    isPending: boolean;
    onEdit: () => void;
    onThread: () => void;
    onDelete: () => void;
    onReaction: (value: string) => void;
    hideThreadButton?: boolean;
};

export const Toolbar = ({
    isAuthor,
    isPending,
    onEdit,
    onThread,
    onDelete,
    onReaction,
    hideThreadButton,
}: Props) => {
    return (
        <div className="absolute top-0 right-5">
            <div className="group-hover:opacity-100 opacity-0 transition-opacity border bg-white rounded-md shadow-sm">
                <EmojiPopover
                    hint="Add reaction"
                    onEmojiSelected={(emoji) => onReaction(emoji)}
                >
                    <Button variant="ghost" size="icon-sm" disabled={isPending}>
                        <Smile className="size-4" />
                    </Button>
                </EmojiPopover>

                {!hideThreadButton && (
                    <Hint label="Reply in thread">
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            disabled={isPending}
                            onClick={onThread}
                        >
                            <MessageSquareText className="size-4" />
                        </Button>
                    </Hint>
                )}

                {isAuthor && (
                    <>
                        <Hint label="Edit message">
                            <Button
                                variant="ghost"
                                size="icon-sm"
                                disabled={isPending}
                                onClick={onEdit}
                            >
                                <Pencil className="size-4" />
                            </Button>
                        </Hint>

                        <Hint label="Delete message">
                            <Button
                                variant="ghost"
                                size="icon-sm"
                                disabled={isPending}
                                onClick={onDelete}
                            >
                                <Trash className="size-4" />
                            </Button>
                        </Hint>
                    </>
                )}
            </div>
        </div>
    );
};
