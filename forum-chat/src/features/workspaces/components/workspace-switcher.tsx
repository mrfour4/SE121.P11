"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useModalStore } from "@/providers/modal-store-provider";

import { Loader, Plus, TriangleAlert } from "lucide-react";
import { useGetWorkSpaces } from "../api/use-get-workspaces";
import { useCurrentWorkSpace } from "../hooks/use-current-workspace";

export const WorkspaceSwitcher = () => {
    const onOpen = useModalStore((state) => state.onOpen);
    const router = useRouter();

    const {
        data: currentWorkspace,
        isPending,
        isError,
    } = useCurrentWorkSpace();
    const workspaces = useGetWorkSpaces();

    const filteredWorkspaces = useMemo(
        () => workspaces.data?.filter((w) => w._id !== currentWorkspace?._id),
        [workspaces, currentWorkspace],
    );

    if (isPending) {
        return (
            <Button className="relative size-9 overflow-hidden bg-gray-1 text-xl font-semibold text-slate-800 hover:bg-gray-1/80">
                <Loader className="size-5 shrink-0 animate-spin" />
            </Button>
        );
    }

    if (isError) {
        return (
            <Button
                variant="destructive"
                className="relative size-9 overflow-hidden text-xl font-semibold"
            >
                <TriangleAlert className="size-5 shrink-0" />
            </Button>
        );
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="relative size-9 overflow-hidden bg-gray-1 text-xl font-semibold uppercase text-slate-800 hover:bg-gray-1/80">
                    {currentWorkspace?.name[0].toUpperCase()}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="start">
                <DropdownMenuLabel>
                    <div className="flex flex-col items-start justify-start capitalize">
                        <p className="line-clamp-1">{currentWorkspace?.name}</p>
                        <span className="text-xs font-normal text-muted-foreground">
                            Active workspace
                        </span>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    {filteredWorkspaces?.map((workspace) => (
                        <DropdownMenuItem
                            key={workspace._id}
                            onClick={() =>
                                void router.push(`/workspaces/${workspace._id}`)
                            }
                        >
                            <div className="relative mr-2 flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-2 text-lg font-semibold uppercase text-white">
                                {workspace.name[0]}
                            </div>
                            <p className="truncate font-medium capitalize">
                                {workspace.name}
                            </p>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => onOpen("create-workspace")}>
                    <div className="relative mr-2 flex size-9 items-center justify-center overflow-hidden rounded-md bg-slate-100 text-lg font-semibold text-slate-800">
                        <Plus />
                    </div>
                    Add a workspace
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
