"use client";

import { useRef, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { updateUser } from "@/actions/user";
import { toast } from "sonner";

type Props = {
    initialValue: string | null;
};

export const BioModal = ({ initialValue }: Props) => {
    const [value, setValue] = useState(initialValue || "");

    const closeRef = useRef<HTMLButtonElement>(null);
    const [isPending, startTransition] = useTransition();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        startTransition(() => {
            updateUser({ bio: value })
                .then(() => {
                    closeRef.current?.click();
                    toast.success("Bio updated");
                })
                .catch(() => {
                    toast.error("Failed to update bio");
                });
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit user bio</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={onSubmit}>
                    <Textarea
                        className="resize-none"
                        placeholder="Write a bio..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <div className="flex justify-between">
                        <DialogClose asChild ref={closeRef}>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isPending || value.trim().length === 0}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
