"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

import { useModalStore } from "@/providers/modal-store-provider";

import { useEffect, useId } from "react";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { useCurrentWorkSpace } from "../hooks/use-current-workspace";

const formSchema = z.object({
    name: z.string().min(1),
});

export type FormValues = z.infer<typeof formSchema>;

export const EditWorkspaceModal = () => {
    const { isOpen, type, onClose } = useModalStore((state) => state);
    const isOpenModal = isOpen && type === "update-workspace";

    const formId = useId();
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const { data: workspace } = useCurrentWorkSpace();

    useEffect(() => {
        form.setValue("name", workspace?.name || "");
    }, [form, workspace]);

    const { mutate, isPending } = useUpdateWorkspace();

    if (!workspace) {
        return null;
    }

    const onSubmit = (values: FormValues) => {
        mutate(
            {
                id: workspace._id!,
                ...values,
            },
            {
                onSuccess: () => {
                    onClose();
                    form.reset();
                    toast.success("Workspace updated");
                },
            },
        );
    };

    return (
        <Dialog open={isOpenModal} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit</DialogTitle>
                    <DialogDescription>Rename this workspace</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        id={formId}
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Workspace name e.g 'Work', 'Home', 'Personal'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isPending}>
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button type="submit" form={formId} disabled={isPending}>
                        Save change
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
