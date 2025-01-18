"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ShareIcon } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";

import { useGetLastExecution } from "@/features/dashboard/api/use-get-execute";
import { useEditor } from "@/hooks/use-editor";
import { useShareSnippet } from "../api/use-share-snippet";

const formSchema = z.object({
    title: z
        .string()
        .min(2, {
            message: "Title must be at least 2 characters",
        })
        .max(50),
});

type FormValues = z.infer<typeof formSchema>;

export const ShareSnippet = () => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const [open, setOpen] = useState(false);

    const share = useShareSnippet();
    const lastExecution = useGetLastExecution();
    const {
        config: { language },
    } = useEditor();

    const disabled =
        share.isPending ||
        lastExecution.isPending ||
        !lastExecution.data?.output ||
        lastExecution.data?.language !== language;

    const onSubmit = ({ title }: FormValues) => {
        if (disabled || !lastExecution.data) return;

        share.mutate(
            {
                title,
                executionId: lastExecution.data._id,
            },
            {
                onSuccess() {
                    form.reset();
                    setOpen(false);
                    toast.success("Snippet shared successfully");
                },
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button disabled={disabled}>
                    <ShareIcon />
                    Share
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md border-none bg-[#1e1e2e]">
                <DialogHeader>
                    <DialogTitle className="text-xl">Share Snippet</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="">Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter title snippet"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage className="text-rose-500" />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end space-x-3">
                            <DialogClose asChild>
                                <Button
                                    variant="ghost"
                                    className="hover:bg-[#2a2a3a]"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button type="submit" disabled={disabled}>
                                Share
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
