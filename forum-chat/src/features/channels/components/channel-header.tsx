"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown, Edit, Trash } from "lucide-react";
import { VideoCall } from "./video-call";

import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useModalStore } from "@/providers/modal-store-provider";

type Props = {
    title: string;
};

export const ChannelHeader = ({ title }: Props) => {
    const onOpen = useModalStore((state) => state.onOpen);

    const { data: member } = useCurrentMember();

    return (
        <div className="flex h-[49px] items-center overflow-hidden border-b bg-white px-4">
            {member?.role === "admin" ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-auto overflow-hidden px-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                        >
                            <p className="truncate text-lg font-semibold">
                                # {title}
                            </p>
                            <ChevronDown className="ml-2 size-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start" className="w-32">
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={() => onOpen("update-channel")}
                            >
                                <Edit className="mr-2 size-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onOpen("delete-channel")}
                            >
                                <Trash className="size-4 text-rose-600 hover:text-rose-600" />
                                <span className="text-rose-600 hover:text-rose-600">
                                    Delete
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <p className="truncate text-lg font-semibold"># {title}</p>
            )}
            <VideoCall />
        </div>
    );
};
