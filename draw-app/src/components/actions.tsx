"use client";

import { Id } from "../../convex/_generated/dataModel";

import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Gem, Link2Icon, Pencil, Trash } from "lucide-react";

import { useRemoveBoard } from "@/features/boards/api/use-remove-board";
import { useConfirm } from "@/hooks/use-confirm";
import { useRenameModal } from "@/hooks/use-rename-modal";

import { toast } from "sonner";

type Props = {
    id: string;
    title: string;
    side?: "top" | "right" | "bottom" | "left";
    sideOffset?: number;
    align?: "start" | "center" | "end";
    children: React.ReactNode;
};

export const Actions = ({
    id,
    title,
    side = "top",
    sideOffset = 0,
    align = "start",
    children,
}: Props) => {
    const remove = useRemoveBoard();
    const { onOpen } = useRenameModal();
    const { confirm, ConfirmDialog } = useConfirm(
        "Delete board",
        `This will delete the board and all of its contents`,
    );

    const onCopyLink = () => {
        navigator.clipboard
            .writeText(`${window.location.origin}/board/${id}`)
            .then(() => {
                toast.success("Link copied to clipboard");
            });
    };

    const onDelete = async () => {
        const ok = await confirm();
        if (!ok) return;

        remove.mutate({ id: id as Id<"boards"> });
    };

    const isPending = remove.isPending;

    return (
        <div>
            <ConfirmDialog />

            <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={isPending}>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side={side}
                    sideOffset={sideOffset}
                    align={align}
                    onClick={(e) => e.stopPropagation()}
                >
                    <DropdownMenuItem
                        className="cursor-pointer p-3"
                        onClick={onCopyLink}
                    >
                        <Link2Icon />
                        Copy board link
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer p-3"
                        onClick={() => onOpen({ id, title })}
                    >
                        <Pencil />
                        Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer p-3"
                        onClick={onDelete}
                    >
                        <Trash />
                        Delete
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer p-3">
                        <Link
                            href={`/board/${id}/premium`}
                            className="text-amber-600 hover:!text-amber-500"
                        >
                            <Gem />
                            Premium
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
