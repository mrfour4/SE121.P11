"use client";

import { Doc } from "../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown, Edit, ListFilter, SquarePen, Trash } from "lucide-react";

import { Hint } from "@/components/hint";

import { useModalStore } from "@/providers/modal-store-provider";

type Props = {
    workspace: Doc<"workspaces">;
    isAdmin: boolean;
};

export const WorkspaceHeader = ({ workspace, isAdmin }: Props) => {
    const onOpen = useModalStore((state) => state.onOpen);
    return (
        <div className="flex h-[49px] items-center justify-between gap-0.5 px-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="transparent"
                        size="sm"
                        className="w-auto overflow-hidden p-1.5 text-lg font-semibold"
                    >
                        <p className="truncate">{workspace.name}</p>
                        <ChevronDown className="ml-2 size-4 shrink-0" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="start">
                    <DropdownMenuLabel>
                        <div className="flex flex-col items-start">
                            <p className="line-clamp-1 font-semibold">
                                {workspace.name}
                            </p>
                            <p className="text-xs font-normal text-muted-foreground">
                                Active workspace
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    {isAdmin && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    onClick={() => onOpen("invite", workspace)}
                                >
                                    <p className="line-clamp-1">
                                        Invite people to {workspace.name}
                                    </p>
                                </DropdownMenuItem>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        Preference
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    onOpen(
                                                        "update-workspace",
                                                        workspace,
                                                    )
                                                }
                                            >
                                                <Edit className="size-4" />
                                                Edit
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() =>
                                                    onOpen(
                                                        "delete-workspace",
                                                        workspace,
                                                    )
                                                }
                                            >
                                                <Trash className="size-4 text-rose-600 hover:text-rose-600" />
                                                <span className="text-rose-600 hover:text-rose-600">
                                                    Delete
                                                </span>
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            </DropdownMenuGroup>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-0.5">
                <Hint label="Filter conversation" side="bottom">
                    <Button variant="transparent" size={"icon-sm"}>
                        <ListFilter className="size-4" />
                    </Button>
                </Hint>

                <Hint label="New message" side="bottom">
                    <Button variant="transparent" size={"icon-sm"}>
                        <SquarePen className="size-4" />
                    </Button>
                </Hint>
            </div>
        </div>
    );
};
