"use client";

import { useWorkspaceId } from "@/features/workspace/hooks/use-workspace-id";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { type IconType } from "react-icons";

import { LucideIcon, Settings, Users } from "lucide-react";
import {
    GoCheckCircle,
    GoCheckCircleFill,
    GoHome,
    GoHomeFill,
} from "react-icons/go";

import { cn } from "@/lib/utils";

type Route = {
    label: string;
    href: string;
    icon: IconType | LucideIcon;
    activeIcon: IconType | LucideIcon;
};

const routes: Route[] = [
    {
        label: "Home",
        href: "",
        icon: GoHome,
        activeIcon: GoHomeFill,
    },
    {
        label: "My Tasks",
        href: "/tasks",
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: Settings,
        activeIcon: Settings,
    },
    {
        label: "Members",
        href: "/members",
        icon: Users,
        activeIcon: Users,
    },
];

export const Navigation = () => {
    const pathname = usePathname();
    const workspaceId = useWorkspaceId();

    return (
        <ul className="flex flex-col">
            {routes.map((route) => {
                const fullHref = `/workspaces/${workspaceId}${route.href}`;
                const isActive = pathname === fullHref;
                const Icon = isActive ? route.activeIcon : route.icon;

                return (
                    <li key={route.href} className="py-2">
                        <Link
                            href={fullHref}
                            className={cn(
                                "flex items-center gap-2.5 rounded-md p-2.5 font-medium text-neutral-500 transition hover:bg-white hover:text-primary",
                                isActive &&
                                    "bg-white text-primary shadow-sm hover:opacity-100",
                            )}
                        >
                            <Icon className="size-5 text-neutral-500" />
                            {route.label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};
