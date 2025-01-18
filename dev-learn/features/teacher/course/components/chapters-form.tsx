"use client";

import { Chapter, Course } from "@prisma/client";
import { ReorderChapter } from "../types";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ChaptersList } from "./chapters-list";

import { AnimatePresence, motion } from "framer-motion";
import { Loader, PlusCircle } from "lucide-react";

import { toast } from "sonner";

import { useCreateChapter } from "../hooks/use-create-chapter";
import { useReorderChapter } from "../hooks/use-reorder-chapters";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
    initialData: Course & { chapters: Chapter[] };
    courseId: string;
};

export const ChaptersForm = ({ initialData, courseId }: Props) => {
    const [isCreating, setIsCreating] = useState(false);
    const inputId = useId();

    const defaultValues = {
        title: "",
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const createChapter = useCreateChapter(courseId);
    const reorderChapter = useReorderChapter(courseId);
    const router = useRouter();

    const onToggle = () => {
        form.reset(defaultValues);
        setIsCreating(!isCreating);
    };

    const onSubmit = async (values: FormValues) => {
        const position = initialData.chapters.length + 1;

        createChapter.mutate(
            { ...values, position },
            {
                onSuccess() {
                    onToggle();
                    toast.success("Chapter created");
                    router.refresh();
                },
            }
        );
    };

    const onReorder = async (updateData: ReorderChapter[]) => {
        reorderChapter.mutate(
            {
                list: updateData,
            },
            {
                onSuccess() {
                    toast.success("Reordered chapter");
                },
            }
        );
    };

    const onEdit = (id: string) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`);
    };

    return (
        <div className="mt-6 p-4 border bg-slate-100 rounded-md shadow-md relative">
            {reorderChapter.isPending && (
                <div className="absolute inset-0 bg-slate-500/20 rounded-md flex items-center justify-center">
                    <Loader className="size-6 text-sky-700 animate-spin" />
                </div>
            )}
            <div className="flex items-center justify-between mb-4">
                <Label htmlFor={inputId} className="text-base font-medium">
                    Course chapters
                </Label>
                <Button variant="ghost" onClick={onToggle}>
                    {isCreating ? (
                        "Cancel"
                    ) : (
                        <>
                            <PlusCircle className="size-4 mr-2" />
                            Add a chapter
                        </>
                    )}
                </Button>
            </div>

            <div className="space-y-4">
                {!isCreating && !initialData.chapters.length && (
                    <div className={"text-sm text-slate-500 italic"}>
                        No chapters
                    </div>
                )}

                {initialData.chapters.length > 0 && (
                    <ChaptersList
                        items={initialData.chapters || []}
                        onReorder={onReorder}
                        onEdit={onEdit}
                    />
                )}

                {!isCreating && (
                    <p className="text-xs text-muted-foreground">
                        Drag and drop to reorder the chapters
                    </p>
                )}
            </div>

            <AnimatePresence>
                {isCreating && (
                    <motion.div
                        initial={{
                            height: 0,
                            opacity: 0,
                        }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4 mt-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    id={inputId}
                                                    className="bg-white"
                                                    placeholder="e.g. 'Introduction to the course'"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex items-center justify-end">
                                    <Button
                                        type="submit"
                                        disabled={createChapter.isPending}
                                    >
                                        Create
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
