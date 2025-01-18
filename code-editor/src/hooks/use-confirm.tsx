import { useState } from "react";

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

type State = {
    resolve: (value: boolean) => void;
} | null;

export const useConfirm = (
    title = "Are you absolutely sure?",
    message = "This action cannot be undone.",
) => {
    const [promise, setPromise] = useState<State>(null);

    const confirm = () =>
        new Promise((resolve, reject) => {
            setPromise({ resolve });
        });

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(true);
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose();
    };

    const ConfirmDialog = () => (
        <Dialog open={promise !== null} onOpenChange={handleClose}>
            <DialogContent
                onClick={(e) => e.stopPropagation()}
                className="max-w-md border-none bg-[#1e1e2e]"
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col gap-2">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="secondary"
                            className="border-none bg-gray-500/10 ring-0 hover:bg-gray-500/20"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={handleConfirm} variant="destructive">
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return { confirm, ConfirmDialog };
};
