"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { EditTaskForm } from "./edit-task-form";

import { useEditTaskModal } from "../hooks/use-edit-task-modal";

export const EditTaskModal = () => {
    const { taskId, close } = useEditTaskModal();
    return (
        <ResponsiveModal open={!!taskId} onOpenChange={close}>
            {taskId && <EditTaskForm id={taskId} onCancel={close} />}
        </ResponsiveModal>
    );
};
