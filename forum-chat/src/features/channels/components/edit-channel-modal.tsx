"use client";

import { useEffect, useId } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { parsedName } from "@/lib/utils";

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

import { toast } from "sonner";

import { useModalStore } from "@/providers/modal-store-provider";
import { useUpdateChannel } from "../api/use-update-channel";
import { useCurrentChannel } from "../hooks/use-current-channel";

const formSchema = z.object({
    name: z.string().min(3).max(80),
});

type FormValues = z.infer<typeof formSchema>;

export const EditChannelModal = () => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const formId = useId();

    const { isOpen, type, onClose } = useModalStore((state) => state);
    const isModalOpen = isOpen && type === "update-channel";

    const { data: channel } = useCurrentChannel();

    useEffect(() => {
        if (!channel) return;

        form.setValue("name", channel.name);
    }, [channel, form]);

    const { mutate, isPending } = useUpdateChannel();

    if (!channel) {
        return null;
    }

    const onSubmit = ({ name }: FormValues) => {
        mutate(
            {
                id: channel._id,
                name,
            },
            {
                onSuccess: () => {
                    onClose();
                    form.reset();
                    toast.success("Channel updated");
                },
            },
        );
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
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
                                            placeholder="e.g plan-budget"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(
                                                    parsedName(e.target.value),
                                                );
                                            }}
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
