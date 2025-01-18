"use client";

import { useCallback, useEffect, useState } from "react";

import { TaskExtend, TaskStatus } from "@/types";
import { TaskState, UpdatePayload } from "../types";

import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "@hello-pangea/dnd";

import { KanbanCard } from "./kanban-card";
import { KanbanColumnHear } from "./kanban-column-header";

import { BOARDS, MAX_POSITION, POSITION_STEP } from "../constants";
import { getInitialTasks } from "../lib/utils";

type Props = {
    data: TaskExtend[];
    onChange: (payload: UpdatePayload[]) => void;
};

export const DataKanban = ({ data, onChange }: Props) => {
    const [tasks, setTasks] = useState<TaskState>(() => getInitialTasks(data));

    useEffect(() => {
        const newTasks = getInitialTasks(data);
        setTasks(newTasks);
    }, [data]);

    const onDragEnd = useCallback(
        (result: DropResult) => {
            if (!result.destination) return;

            const { source, destination } = result;

            const sourceStatus = source.droppableId as TaskStatus;
            const destinationStatus = destination.droppableId as TaskStatus;

            let updatesPayload: UpdatePayload[] = [];

            setTasks((prev) => {
                const newTasks = { ...prev };

                const sourceCol = [...newTasks[sourceStatus]];
                const [movedTask] = sourceCol.splice(source.index, 1);

                if (!movedTask) {
                    console.log("Task not found");
                    return prev;
                }

                const updatedMovedTask =
                    sourceStatus !== destinationStatus
                        ? { ...movedTask, status: destinationStatus }
                        : movedTask;

                newTasks[sourceStatus] = sourceCol;
                const destinationCol = [...newTasks[destinationStatus]];
                destinationCol.splice(destination.index, 0, updatedMovedTask);
                newTasks[destinationStatus] = destinationCol;

                updatesPayload = [];

                updatesPayload.push({
                    $id: updatedMovedTask.$id,
                    status: updatedMovedTask.status,
                    position: Math.min(
                        (destination.index + 1) * POSITION_STEP,
                        MAX_POSITION,
                    ),
                });

                newTasks[destinationStatus].forEach((task, index) => {
                    if (task && task.$id !== updatedMovedTask.$id) {
                        const newPosition = Math.min(
                            (index + 1) * POSITION_STEP,
                            MAX_POSITION,
                        );
                        if (task.position != newPosition) {
                            updatesPayload.push({
                                $id: task.$id,
                                status: task.status,
                                position: newPosition,
                            });
                        }
                    }
                });

                if (sourceStatus != destinationStatus) {
                    newTasks[sourceStatus].forEach((task, index) => {
                        if (task) {
                            const newPosition = Math.min(
                                (index + 1) * 1000,
                                1_000_000,
                            );
                            if (task.position != newPosition) {
                                updatesPayload.push({
                                    $id: task.$id,
                                    status: task.status,
                                    position: newPosition,
                                });
                            }
                        }
                    });
                }
                return newTasks;
            });
            onChange(updatesPayload);
        },
        [onChange],
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex overflow-x-auto">
                {BOARDS.map((board) => {
                    return (
                        <div
                            key={board}
                            className="mx-2 min-w-[200px] flex-1 rounded-md bg-muted p-1.5"
                        >
                            <KanbanColumnHear
                                board={board}
                                taskCount={tasks[board].length}
                            />
                            <Droppable droppableId={board}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="min-h-[200px] py-1.5"
                                    >
                                        {tasks[board].map((task, index) => (
                                            <Draggable
                                                key={task.$id}
                                                draggableId={task.$id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <KanbanCard
                                                            task={task}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    );
                })}
            </div>
        </DragDropContext>
    );
};
