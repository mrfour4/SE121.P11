"use client";

import { useEffect } from "react";

import { useCreatorSidebar } from "@/stores/use-creator-sidebar";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";

type Props = {
    children: React.ReactNode;
};

export const Container = ({ children }: Props) => {
    const { collapsed, onCollapse, onExpand } = useCreatorSidebar();
    const isMobile = useMediaQuery("(max-width: 1024px)");

    useEffect(() => {
        if (isMobile) {
            onCollapse();
        } else {
            onExpand();
        }
    }, [isMobile, onCollapse, onExpand]);

    return (
        <div className={cn("ml-[70px] flex-1", !collapsed && "lg:ml-60")}>
            {children}
        </div>
    );
};
