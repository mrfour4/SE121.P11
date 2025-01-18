"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

type Props = {
    label: string;
    id: string;
    Icon: LucideIcon;
    isActive?: boolean;
};

export const SidebarItem = ({ id, label, isActive = false, Icon }: Props) => {
    const workspaceId = useWorkspaceId();
    return (
        <Button
            variant="transparent"
            size="sm"
            asChild
            className={cn(
                "flex h-7 items-center justify-start gap-1.5 overflow-hidden px-[18px] text-sm font-normal text-[#f9edffcc]",
                isActive && "bg-white/90 text-blue-1 hover:bg-white/90",
            )}
        >
            <Link href={`/workspaces/${workspaceId}/channels/${id}`}>
                <Icon className="mr-1 size-4 shrink-0" />
                <span className="truncate text-sm">{label}</span>
            </Link>
        </Button>
    );
};
