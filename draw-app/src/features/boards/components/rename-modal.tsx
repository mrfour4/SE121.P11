"use client";

import { Id } from "../../../../convex/_generated/dataModel";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useRenameModal } from "@/hooks/use-rename-modal";
import { useUpdateBoard } from "../api/use-update-board";

import { toast } from "sonner";

export const RenameModal = () => {
    const { isOpen, initialValues, onClose } = useRenameModal();
    const [title, setTitle] = useState("");

    const { mutate, isPending } = useUpdateBoard();

    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title) return;

        const id = initialValues.id as Id<"boards">;

        mutate(
            { id, title },
            {
                onSuccess: () => {
                    toast.success("Board title updated successfully");
                    onClose();
                },
            },
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit board title</DialogTitle>
                    <DialogDescription>
                        Enter a new title for this board
                    </DialogDescription>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <Input
                            required
                            maxLength={60}
                            placeholder="Board title"
                            disabled={false}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending}>
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
