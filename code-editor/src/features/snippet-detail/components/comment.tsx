"use client";

import { Comment as TComment } from "@/types";

import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";

import { MarkdownRenderer } from "@/components/markdown-renderer";
import { UserAvatar } from "@/components/user-avatar";

import { useConfirm } from "@/hooks/use-confirm";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useDeleteComment } from "../api/use-delete-comment";
import { useGetUser } from "../api/use-get-user";

import { formatDateTime } from "@/features/snippets/lib/utils";

type Props = {
    comment: TComment;
};

export const Comment = ({ comment }: Props) => {
    const { user } = useCurrentUser();
    const { data: owner } = useGetUser(comment.userId);
    const { isPending, mutate } = useDeleteComment();
    const { confirm, ConfirmDialog } = useConfirm("Delete comment");

    const onDelete = async () => {
        const ok = await confirm();
        if (!ok) return;

        mutate({ id: comment._id });
    };

    return (
        <div className="space-y-4 rounded-xl border border-[#ffffff0a] bg-[#1e1e2e]/50 p-6 transition-all hover:border-[#ffffff14]">
            <ConfirmDialog />

            <div className="flex items-start justify-between gap-4 sm:items-center">
                <div className="flex items-center gap-4">
                    <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-[#ffffff08]">
                        <UserAvatar src={owner?.imageUrl} />
                    </div>
                    <div>
                        <p className="truncate font-medium text-[#e1e1e3]">
                            {comment.userName}
                        </p>
                        <p className="text-sm text-[#808086]">
                            {formatDateTime(comment._creationTime)}
                        </p>
                    </div>
                </div>

                {comment.userId === user?.userId && (
                    <Button
                        variant="secondary"
                        className="size-7 border-none bg-gray-500/10 ring-0 hover:bg-red-500/10 hover:text-red-400"
                        disabled={isPending}
                        onClick={onDelete}
                    >
                        {isPending ? (
                            <Loader className="!size-3.5 animate-spin" />
                        ) : (
                            <Trash2 className="!size-3.5" />
                        )}
                    </Button>
                )}
            </div>
            <MarkdownRenderer content={comment.content} />
        </div>
    );
};
