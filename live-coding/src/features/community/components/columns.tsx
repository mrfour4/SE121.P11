"use client";

import { Column, ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

import { UserAvatar } from "@/components/user-avatar";
import { UnblockButton } from "./unblock-button";

export type BlockedUser = {
    id: string;
    userId: string;
    imageUrl: string;
    username: string;
    createdAt: string;
};

export const columns: ColumnDef<BlockedUser>[] = [
    {
        accessorKey: "username",
        header: ({ column }) => (
            <ColumnHeader column={column} title="Username" />
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-x-4">
                <UserAvatar
                    username={row.original.username}
                    imageUrl={row.original.imageUrl}
                />
                <span>{row.original.username}</span>
            </div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <ColumnHeader column={column} title="Date blocked" />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => <UnblockButton userId={row.original.userId} />,
    },
];

interface Props<TData, TValue> {
    column: Column<TData, TValue>;
    title: string;
}

export function ColumnHeader<TData, TValue>({
    column,
    title,
}: Props<TData, TValue>) {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {title}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    );
}
