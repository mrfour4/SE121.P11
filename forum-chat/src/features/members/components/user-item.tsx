"use client";

import { Id } from "../../../../convex/_generated/dataModel";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

type Props = {
    id: Id<"members">;
    label?: string;
    imageUrl?: string;
    isActive?: boolean;
};

export const UserItem = ({
    id,
    label = "Member",
    imageUrl,
    isActive = false,
}: Props) => {
    const workspaceId = useWorkspaceId();

    return (
        <Button
            variant="transparent"
            size="sm"
            className={cn(
                "flex h-7 items-center justify-start gap-1.5 overflow-hidden px-[18px] text-sm font-normal text-gray-0/80",
                isActive && "bg-white/90 text-blue-1 hover:bg-white/90",
            )}
            asChild
        >
            <Link href={`/workspaces/${workspaceId}/member/${id}`}>
                <Avatar className="mr-1 size-5 rounded-md">
                    <AvatarImage src={imageUrl} className="rounded-md" />
                    <AvatarFallback className="rounded-md bg-sky-500 text-xs uppercase text-white">
                        {label[0]}
                    </AvatarFallback>
                </Avatar>

                <p className="truncate text-sm">{label}</p>
            </Link>
        </Button>
    );
};
