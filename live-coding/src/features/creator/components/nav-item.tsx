"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/stores/use-creator-sidebar";
import { useMediaQuery } from "usehooks-ts";

type Props = {
    label: string;
    href: string;
    icon: LucideIcon;
    isActive: boolean;
};

export const NavItem = ({ label, href, icon: Icon, isActive }: Props) => {
    const { collapsed } = useCreatorSidebar();
    const isMobile = useMediaQuery("(max-width: 1024px)");

    const isShowLabel = !isMobile && !collapsed;

    return (
        <Button
            asChild
            variant="ghost"
            className={cn(
                "h-12 w-full",
                collapsed ? "justify-center" : "justify-start",
                isActive && "bg-accent",
            )}
        >
            <Link href={href}>
                <div className="flex items-center gap-x-4">
                    <Icon className={!isShowLabel ? "mr-0" : "mr-2"} />
                    {isShowLabel && <span>{label}</span>}
                </div>
            </Link>
        </Button>
    );
};

export const NavItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <Skeleton className="min-h-12 min-w-12 rounded-md" />
            <div className="hidden flex-1 lg:block">
                <Skeleton className="h-6" />
            </div>
        </li>
    );
};
