"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Hint } from "@/components/hint";
import { CheckCheck, LinkIcon, RefreshCcw } from "lucide-react";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useModalStore } from "@/providers/modal-store-provider";
import { useNewJoinCode } from "../api/use-new-join-code";
import { useCurrentWorkSpace } from "../hooks/use-current-workspace";

import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const InviteModal = () => {
    const { isOpen, type, onClose } = useModalStore((state) => state);
    const isModalOpen = isOpen && type === "invite";

    const { isCopied, copyToClipboard } = useCopyToClipboard();

    const { data: workspace } = useCurrentWorkSpace();
    const { mutate, isPending } = useNewJoinCode();

    if (!workspace) {
        return null;
    }

    const onCopyLink = () => {
        const invitedLink = `${location.origin}/join/${workspace._id}`;
        copyToClipboard(invitedLink);
    };

    const onNewCode = () => {
        mutate(
            {
                id: workspace._id!,
            },
            {
                onSuccess: () => {
                    toast.success("Invite code regenerate");
                },
            },
        );
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite people to {workspace.name}</DialogTitle>
                    <DialogDescription>
                        Use code bellow to invite people to your workspace
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-center justify-center gap-x-4 py-10">
                    <p
                        className={cn(
                            "text-4xl font-bold tracking-widest",
                            isPending && "opacity-50",
                        )}
                    >
                        {workspace.joinCode}
                    </p>

                    <Hint label="Generate new code">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onNewCode}
                            disabled={isPending}
                        >
                            <RefreshCcw className="size-4" />
                        </Button>
                    </Hint>
                </div>

                <div className="flex w-full items-center justify-between">
                    <Button
                        variant="link"
                        className="text-blue-600"
                        onClick={onCopyLink}
                    >
                        {isCopied ? (
                            <CheckCheck className="size-4" />
                        ) : (
                            <LinkIcon className="size-4" />
                        )}
                        {isCopied ? "Copied" : "Copy invite link"}
                    </Button>

                    <DialogClose asChild>
                        <Button>Close</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};
