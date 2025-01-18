"use client";

import { Chapter } from "@prisma/client";
import { ReorderChapter } from "../types";

import { useMounted } from "@/hooks/use-mounted";
import { useEffect, useId, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "@hello-pangea/dnd";

import { cn, moveElement } from "@/lib/utils";
import { GripVertical, Pencil } from "lucide-react";

type Props = {
    items: Chapter[];
    onReorder: (updateData: ReorderChapter[]) => void;
    onEdit: (id: string) => void;
};

export const ChaptersList = ({ items, onReorder, onEdit }: Props) => {
    const [chapters, setChapters] = useState(items);

    const droppableId = useId();

    useEffect(() => {
        setChapters(items);
    }, [items]);

    const mounted = useMounted();
    if (!mounted) return null;

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) return;

        const items = moveElement(chapters, source.index, destination.index);
        setChapters(items);

        const startIndex = Math.min(source.index, destination.index);
        const endIndex = Math.max(source.index, destination.index);

        const updatedChapters = items.slice(startIndex, endIndex + 1);
        const bulkUpdateData = updatedChapters.map((chapter, index) => ({
            id: chapter.id,
            position: index + startIndex + 1,
        }));

        onReorder(bulkUpdateData);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={droppableId}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter, index) => (
                            <Draggable
                                key={chapter.id}
                                draggableId={chapter.id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        className={cn(
                                            "mb-2 flex items-center gap-x-2 bg-slate-200 border border-slate-200 rounded-md text-sm text-slate-700",
                                            chapter.isPublished &&
                                                "bg-sky-100 border-sky-200"
                                        )}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <div
                                            className={cn(
                                                "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                                chapter.isPublished &&
                                                    "border-r-sky-200 hover:bg-sky-200"
                                            )}
                                            {...provided.dragHandleProps}
                                        >
                                            <GripVertical className="size-5" />
                                        </div>

                                        {chapter.title}

                                        <div className="ml-auto pr-2 flex items-center gap-x-1">
                                            {chapter.isFree && (
                                                <Badge>Free</Badge>
                                            )}

                                            <Badge
                                                className={cn(
                                                    "bg-slate-500",
                                                    chapter.isPublished &&
                                                        "bg-sky-700 hover:bg-sky-600"
                                                )}
                                            >
                                                {chapter.isPublished
                                                    ? "Published"
                                                    : "Draft"}
                                            </Badge>

                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="hover:bg-transparent "
                                            >
                                                <Pencil
                                                    className="size-4 cursor-pointer hover:opacity-75 transition"
                                                    onClick={() =>
                                                        onEdit(chapter.id)
                                                    }
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};
