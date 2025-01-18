"use client";

import { useRouter } from "next/navigation";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { useModalStore } from "@/providers/modal-store-provider";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { useGetWorkSpaces } from "../api/use-get-workspaces";
import { useCurrentWorkSpace } from "../hooks/use-current-workspace";

export const DeleteWorkspaceModal = () => {
    const { type, isOpen, onClose } = useModalStore((state) => state);
    const isOpenModal = isOpen && type === "delete-workspace";

    const { data: currentWorkspace } = useCurrentWorkSpace();
    const { data: workspaces } = useGetWorkSpaces();

    const { mutate, isPending } = useDeleteWorkspace();

    const router = useRouter();

    if (!currentWorkspace || !workspaces) {
        return null;
    }

    const onDelete = () => {
        mutate(
            {
                id: currentWorkspace._id!,
            },
            {
                onSuccess: () => {
                    router.replace(`/`);
                    toast.success("Deleted workspace");
                },
            },
        );
    };

    return (
        <AlertDialog open={isOpenModal} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete{" "}
                        <span className="font-semibold">
                            {currentWorkspace.name}
                        </span>{" "}
                        workspace?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete workspace and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button onClick={onDelete} disabled={isPending}>
                            Continue
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
