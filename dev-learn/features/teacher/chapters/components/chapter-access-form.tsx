"use client";

import { Chapter } from "@prisma/client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

import { AnimatePresence, motion } from "framer-motion";
import { Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { useUpdateChapter } from "../hooks/use-update-chapter";

const formSchema = z.object({
    isFree: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
};

export const ChapterAccessForm = ({
    initialData,
    courseId,
    chapterId,
}: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const inputId = useId();

    const defaultValues = {
        isFree: !!initialData.isFree,
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
                    Chapter access
                </Label>
                <Button variant="ghost" onClick={onToggle}>
                    {isEditing ? (
                        "Cancel"
                    ) : (
                        <>
                            <Pencil className="size-4 mr-2" />
                            Edit access
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p
                    className={cn(
                        "text-sm mt-2",
                        !initialData.isFree && "text-slate-500 italic"
                    )}
                >
                    {initialData.isFree
                        ? "This chapter is free for preview"
                        : "This chapter is not free"}
                </p>
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
                                    name="isFree"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-white shadown-sm">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>

                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    Make this course is preview
                                                </FormLabel>
                                                <FormDescription>
                                                    Check this box if you want
                                                    to make this chapter free
                                                    for preview
                                                </FormDescription>
                                            </div>
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
