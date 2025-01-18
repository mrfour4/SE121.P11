"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Headset } from "lucide-react";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const VideoCall = () => {
    const workspaceId = useWorkspaceId();
    const router = useRouter();

    return (
        <Button
            variant="ghost"
            size="icon-sm"
            className="ml-auto"
            onClick={() => {
                router.push(`/meet/${workspaceId}`);
            }}
        >
            <Headset className="size-6 text-muted-foreground" />
        </Button>
    );
};
