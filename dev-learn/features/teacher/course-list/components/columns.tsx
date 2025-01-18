"use client";

import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

import { ColumnHeader } from "@/components/column-header";
import { TableRowActions } from "./table-row-actions";

export const columns: ColumnDef<Course>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => <ColumnHeader column={column} title="Title" />,
    },
    {
        accessorKey: "price",
        header: ({ column }) => <ColumnHeader column={column} title="Price" />,
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"));
            const formatted = formatPrice(price);

            return <p>{formatted}</p>;
        },
    },
    {
        accessorKey: "isPublished",
        header: ({ column }) => (
            <ColumnHeader column={column} title="Published" />
        ),
        cell: ({ row }) => {
            const isPublished = row.original.isPublished;

            return (
                <Badge
                    className={cn(
                        "bg-slate-500",
                        isPublished && "bg-sky-700 hover:bg-sky-600"
                    )}
                >
                    {isPublished ? "Published" : "Draft"}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <TableRowActions row={row} />,
        enableSorting: false,
        enableHiding: false,
    },
];
