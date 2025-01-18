"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { CreateTaskForm } from "./create-task-form";

import { useCreateTaskModal } from "../hooks/use-create-task-modal";

export const CreateTaskModal = () => {
    const { isOpen, setIsOpen, close } = useCreateTaskModal();
    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateTaskForm onCancel={close} />
        </ResponsiveModal>
    );
};
