"use client";

import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Table } from "@tanstack/react-table";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

import { useConfirm } from "@/hooks/use-confirm";
import { useBulkDeleteCourses } from "../hooks/use-bulk-delete";

import { CourseDialog } from "./course-dialog";

interface Props<TData> {
    table: Table<TData>;
}

export function TableToolbar<TData>({ table }: Props<TData>) {
    const { confirm, ConfirmDialog } = useConfirm(
        "Delete all courses is selected"
    );

    const idsSelected = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => (row.original as Course).id);

    const { mutate } = useBulkDeleteCourses();
    const router = useRouter();

    const onDelete = async () => {
        if (!idsSelected.length) return;

        const ok = await confirm();

        if (!ok) return;

        mutate(idsSelected, {
            onSuccess() {
                router.refresh();
                toast.success("Deleted courses");
            },
        });
    };

    return (
        <>
            <ConfirmDialog />
            <div className="flex items-center gap-x-2">
                {!!idsSelected.length && (
                    <Button
                        variant="destructive"
                        onClick={onDelete}
                        className="gap-x-2"
                    >
                        <Trash className="size-4" />
                        <span className="hidden sm:block">Delete courses</span>
                    </Button>
                )}

                <CourseDialog />
            </div>
        </>
    );
}
