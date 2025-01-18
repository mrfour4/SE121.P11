"use client";

import { usePathname } from "next/navigation";

import { SidebarButton } from "@/components/sidebar-button";
import { UserButton } from "@/components/user-button";
import { WorkspaceSwitcher } from "@/features/workspaces/components/workspace-switcher";

import { Bell, Home, MessageSquare } from "lucide-react";
import { Tools } from "./tools";

export const Sidebar = () => {
    const pathname = usePathname();
    return (
        <aside className="flex h-full w-[70px] flex-col items-center gap-y-4 bg-blue-1 pb-4 pt-[9px]">
            <WorkspaceSwitcher />

            <SidebarButton
                Icon={Home}
                label="Home"
                isActive={pathname.includes("/workspaces")}
            />
            <SidebarButton Icon={MessageSquare} label="DMs" />
            <SidebarButton Icon={Bell} label="Activity" />
            <Tools />

            <div className="mt-auto flex flex-col items-center justify-center gap-y-1">
                <UserButton />
            </div>
        </aside>
    );
};
