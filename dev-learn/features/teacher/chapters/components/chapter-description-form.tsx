"use client";

import { Chapter } from "@prisma/client";

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
import { Label } from "@/components/ui/label";

import { Editor } from "@/components/editor";

import { AnimatePresence, motion } from "framer-motion";
import { Pencil } from "lucide-react";

import { Preview } from "@/components/preview";

import { isEmptyText } from "@/lib/utils";
import { toast } from "sonner";

import { useUpdateChapter } from "../hooks/use-update-chapter";

const formSchema = z.object({
    description: z.string().min(1),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
};

export const ChapterDescriptionForm = ({
    initialData,
    courseId,
    chapterId,
}: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const inputId = useId();

    const defaultValues = {
        description: initialData.description || "",
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const { mutate, isPending } = useUpdateChapter({ courseId, id: chapterId });
    const router = useRouter();

    const onToggle = () => {
        form.reset(defaultValues);
        setIsEditing(!isEditing);
    };

    const onSubmit = async (values: FormValues) => {
        if (isEmptyText(values.description)) {
            form.setError("description", {
                message: "Description required",
            });

            return;
        }
        console.log(values);
        mutate(values, {
            onSuccess() {
                onToggle();
                toast.success("Description updated");
                router.refresh();
            },
        });
    };

    return (
        <div className="mt-6 p-4 border bg-slate-100 rounded-md shadow-md">
            <div className="flex items-center justify-between">
                <Label htmlFor={inputId} className="text-base font-medium">
                    Chapter description
                </Label>
                <Button variant="ghost" onClick={onToggle}>
                    {isEditing ? (
                        "Cancel"
                    ) : (
                        <>
                            <Pencil className="size-4 mr-2" />
                            Edit description
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <div className="mt-2">
                    {initialData.description ? (
                        <Preview value={initialData.description} />
                    ) : (
                        <p className="text-sm text-slate-500 italic">
                            No description
                        </p>
                    )}
                </div>
            )}

            <AnimatePresence>
                {isEditing && (
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
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Editor
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex items-center justify-end">
                                    <Button type="submit" disabled={isPending}>
                                        Save
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
