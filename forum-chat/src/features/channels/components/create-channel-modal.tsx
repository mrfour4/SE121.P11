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

import { parsedName } from "@/lib/utils";
import { toast } from "sonner";

import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useModalStore } from "@/providers/modal-store-provider";
import { useCreateChannel } from "../api/use-create-channel";

const formSchema = z.object({
    name: z.string().min(3).max(80),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateChannelModal = () => {
    const { isOpen, type, onClose } = useModalStore((state) => state);
    const isModalOpen = isOpen && type === "create-channel";

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const workspaceId = useWorkspaceId();
    const { mutate, isPending } = useCreateChannel();

    const router = useRouter();

    const onSubmit = ({ name }: FormValues) => {
        mutate(
            {
                name,
                workspaceId,
            },
            {
                onSuccess(id) {
                    onClose();
                    form.reset();

                    router.push(`/workspaces/${workspaceId}/channels/${id}`);
                    toast.success("Created new channel");
                },
                onError() {
                    toast.error("Fail to create channel");
                },
            },
        );
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a channel</DialogTitle>
                    <DialogDescription>Create new channel</DialogDescription>
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
