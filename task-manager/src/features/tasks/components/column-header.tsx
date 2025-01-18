import { Task } from "@/types";
import { Column } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

type Props = {
    title: string;
    column: Column<Task, unknown>;
};

export const ColumnHeader = ({ title, column }: Props) => {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {title}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    );
};
