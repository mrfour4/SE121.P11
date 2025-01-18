"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Hint } from "@/components/hint";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { useSidebar } from "@/stores/use-sidebar";
import { useMediaQuery } from "usehooks-ts";

export const Toggle = () => {
    const { collapsed, onCollapse, onExpand } = useSidebar();
    const isMobile = useMediaQuery("(max-width: 1024px)");

    const label = collapsed ? "Expand" : "Collapse";

    return (
        <>
            {collapsed && (
                <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
                    <Hint label={label} side="right" asChild>
                        <Button
                            variant="ghost"
                            className="h-auto p-2"
                            onClick={onExpand}
                        >
                            <ArrowRightFromLine />
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && !isMobile && (
                <div className="mb-2 flex w-full items-center p-3 pl-6">
                    <p className="font-semibold text-primary">For you</p>
                    <Hint label={label} side="right" asChild>
                        <Button
                            className="ml-auto h-auto p-2"
                            variant="ghost"
                            onClick={onCollapse}
                        >
                            <ArrowLeftFromLine />
                        </Button>
                    </Hint>
                </div>
            )}
        </>
    );
};

export const ToggleSkeleton = () => {
    return (
        <div className="mb-2 hidden w-full items-center justify-between p-3 pl-6 lg:flex">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="size-6" />
        </div>
    );
};
