"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Loader, LogOut, TriangleAlert } from "lucide-react";
import { DotSeparator } from "./dot-separator";

import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";

export const UserButton = () => {
    const { data: user, isPending, isSuccess } = useCurrent();
    const { mutate: logout } = useLogout();

    if (isPending) {
        return (
            <div className="flex size-10 items-center justify-center rounded-full border border-neutral-300 bg-neutral-200">
                <Loader className="size-4 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (isSuccess && !user) {
        return (
            <div className="flex size-10 items-center justify-center rounded-full border border-neutral-300 bg-neutral-200">
                <TriangleAlert className="size-4 text-destructive" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const { name, email } = user;

    const avatarFallback = name
        ? name[0].toUpperCase()
        : (email[0].toUpperCase() ?? "U");

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className="relative outline-none">
                <Avatar className="size-10 border border-neutral-300 transition hover:opacity-75">
                    <AvatarFallback className="flex items-center justify-center bg-neutral-200 font-medium text-muted-foreground">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60" sideOffset={10}>
                <DropdownMenuLabel className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
                    <Avatar className="size-[52px] border border-neutral-300 transition hover:opacity-75">
                        <AvatarFallback className="flex items-center justify-center bg-neutral-200 text-xl font-medium text-muted-foreground">
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>

                    <div className="text-center">
                        <p className="text-sm font-medium capitalize text-neutral-900">
                            {name || "User"}
                        </p>
                        <p className="text-xs text-neutral-500">{email}</p>
                    </div>
                </DropdownMenuLabel>

                <DotSeparator className="mb-1" />

                <DropdownMenuItem
                    className="h-10 cursor-pointer justify-center font-medium text-amber-700"
                    onClick={() => logout()}
                >
                    <LogOut />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
