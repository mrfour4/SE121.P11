"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Hint } from "@/components/hint";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { useCreatorSidebar } from "@/stores/use-creator-sidebar";

export const Toggle = () => {
    const { collapsed, onCollapse, onExpand } = useCreatorSidebar();

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
            {!collapsed && (
                <div className="mb-2 hidden w-full items-center p-3 pl-6 lg:flex">
                    <p className="font-semibold text-primary">Dashboard</p>
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
