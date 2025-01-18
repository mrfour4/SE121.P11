"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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

import { useModalStore } from "@/providers/modal-store-provider";
import { useCreateWorkspace } from "../api/use-create-workspace";

import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateWorkspaceModal = () => {
    const { isOpen, type, onClose } = useModalStore((state) => state);
    const isOpenModal = isOpen && type === "create-workspace";

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const { isPending, mutate } = useCreateWorkspace();
    const router = useRouter();

    const onSubmit = (values: FormValues) => {
        mutate(values, {
            onSuccess(id) {
                form.reset();
                onClose();
                toast.success("Workspace created");
                router.push(`/workspaces/${id}`);
            },
        });
    };

    return (
        <Dialog open={isOpenModal} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a workspace</DialogTitle>
                    <DialogDescription>Create your workspace</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Workspace name</FormLabel>
                                    <FormControl>
                                        <Input
                                            autoFocus
                                            required
                                            minLength={1}
                                            disabled={isPending}
                                            placeholder="Workspace name e.g 'Work', 'Home', 'Personal'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isPending}>
                                Create
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
