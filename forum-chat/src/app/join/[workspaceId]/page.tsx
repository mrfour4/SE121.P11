"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

import { toast } from "sonner";

import { Loader, TriangleAlert } from "lucide-react";

import { useWorkspaceInfo } from "@/features/workspaces/api/use-get-info";
import { useJoinWorkspace } from "@/features/workspaces/api/use-join-workspace";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export default function JoinPage() {
    const workspaceId = useWorkspaceId();
    const router = useRouter();

    const info = useWorkspaceInfo(workspaceId);
    const { mutate, isPending } = useJoinWorkspace();

    useEffect(() => {
        if (info.data?.isMember) {
            router.push(`/workspaces/${workspaceId}`);
        }
    }, [router, workspaceId, info]);

    if (info.isPending) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader className="size-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!info.data) {
        return (
            <div className="flex h-full flex-col items-center justify-center">
                <TriangleAlert className="size-6" />
                <p className="text-sm text-muted-foreground">
                    Workspace not found
                </p>
            </div>
        );
    }

    const joinCodeLength = 6;

    const onComplete = (value: string) => {
        mutate(
            {
                joinCode: value,
                workspaceId,
            },
            {
                onSuccess: () => {
                    router.replace(`/workspaces/${workspaceId}`);
                    toast.success("Workspace joined");
                },
            },
        );
    };

    return (
        <div className="flex h-full flex-col items-center justify-center gap-y-8 rounded-md bg-white p-8 shadow-md">
            <Image
                src="/logo.svg"
                alt="Logo"
                width={60}
                height={60}
                className="size-24"
            />
            <div className="flex flex-col items-center justify-center gap-y-2">
                <h1 className="text-2xl font-bold">
                    Join workspace: {info.data.name}
                </h1>
                <p className="text-md text-muted-foreground">
                    Enter the workspace code to join
                </p>
            </div>

            <InputOTP
                maxLength={joinCodeLength}
                onComplete={onComplete}
                disabled={info.isLoading || isPending}
            >
                <InputOTPGroup>
                    {Array(joinCodeLength)
                        .fill(0)
                        .map((_, i) => (
                            <InputOTPSlot
                                key={i}
                                index={i}
                                className="text-lg font-medium text-gray-500"
                            />
                        ))}
                </InputOTPGroup>
            </InputOTP>

            <div className="flex gap-x-4">
                <Button size="lg" variant="link" asChild>
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </div>
    );
}
