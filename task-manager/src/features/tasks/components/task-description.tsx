"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { DotSeparator } from "@/components/dot-separator";
import { TaskExtend } from "@/types";

import { Pencil, X } from "lucide-react";
import { useUpdateTask } from "../api/use-update-task";

type Props = {
    task: TaskExtend;
};

export const TaskDescription = ({ task }: Props) => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(task.description);

    const { mutate, isPending } = useUpdateTask();

    const onSave = () => {
        mutate(
            {
                json: { description: value },
                param: { taskId: task.$id },
            },
            {
                onSuccess: () => {
                    setEditing(false);
                },
            },
        );
    };

    return (
        <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Description</p>
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setEditing(!editing)}
                >
                    {editing ? (
                        <>
                            <X />
                            Cancel
                        </>
                    ) : (
                        <>
                            <Pencil />
                            Edit
                        </>
                    )}
                </Button>
            </div>
            <DotSeparator className="my-4" />
            {editing ? (
                <div className="flex flex-col gap-y-4">
                    <Textarea
                        placeholder="Add a description"
                        value={value}
                        rows={4}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <Button
                        size="sm"
                        className="ml-auto w-fit"
                        onClick={onSave}
                        disabled={isPending}
                    >
                        {isPending ? "Saving..." : "Save"}
                    </Button>
                </div>
            ) : (
                <div>
                    {task.description || (
                        <span className="text-muted-foreground">
                            No description provided
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};
