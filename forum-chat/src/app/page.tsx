"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Loader } from "lucide-react";

import { useGetWorkSpaces } from "@/features/workspaces/api/use-get-workspaces";
import { useModalStore } from "@/providers/modal-store-provider";

export default function Home() {
    const { data, isPending } = useGetWorkSpaces();

    const workspaceId = data?.[0]?._id;

    const { onOpen, onClose, isOpen } = useModalStore((state) => state);
    const router = useRouter();

    useEffect(() => {
        if (isPending) {
            return;
        }

        if (workspaceId) {
            onClose();
            router.replace(`/workspaces/${workspaceId}`);
        } else if (!isOpen) {
            onOpen("create-workspace");
        }
    }, [isPending, workspaceId, isOpen, router, onClose, onOpen]);

    return (
        <div className="flex h-full items-center justify-center">
            <Loader className="size-10 animate-spin text-muted-foreground" />
        </div>
    );
}
