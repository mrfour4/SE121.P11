import { Column } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { ArrowUpDown } from "lucide-react";

interface Props<TData, TValue> extends React.HTMLAttributes<HTMLElement> {
    column: Column<TData, TValue>;
    title: string;
}

export function ColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: Props<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4"
        >
            {title}
            <ArrowUpDown className="ml-2 size-4" />
        </Button>
    );
}
