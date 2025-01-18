"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import {
    Fullscreen,
    KeyRound,
    LucideIcon,
    MessageSquare,
    Users,
} from "lucide-react";

import { NavItem, NavItemSkeleton } from "./nav-item";

type Route = {
    label: string;
    href: string;
    icon: LucideIcon;
};

export const Navigation = () => {
    const pathname = usePathname();
    const { user } = useUser();

    const routes: Route[] = [
        {
            label: "Stream",
            href: `/u/${user?.username}`,
            icon: Fullscreen,
        },
        {
            label: "Keys",
            href: `/u/${user?.username}/keys`,
            icon: KeyRound,
        },
        {
            label: "Chat",
            href: `/u/${user?.username}/chat`,
            icon: MessageSquare,
        },
        {
            label: "Community",
            href: `/u/${user?.username}/community`,
            icon: Users,
        },
    ];

    if (!user?.username) {
        return (
            <ul className="space-y-2">
                {[...Array(4)].map((_, index) => (
                    <NavItemSkeleton key={index} />
                ))}
            </ul>
        );
    }
    return (
        <ul className="space-y-2 px-2 pt-4 lg:pt-0">
            {routes.map((route) => (
                <li key={route.href}>
                    <NavItem
                        label={route.label}
                        href={route.href}
                        icon={route.icon}
                        isActive={pathname === route.href}
                    />
                </li>
            ))}
        </ul>
    );
};
