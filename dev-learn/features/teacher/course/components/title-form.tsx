"use client";

import { Course } from "@prisma/client";

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

import { AnimatePresence, motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { useUpdateCourse } from "../hooks/use-update-course";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
    initialData: Course;
    courseId: string;
};

export const TitleForm = ({ initialData, courseId }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const inputId = useId();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const { mutate, isPending } = useUpdateCourse(courseId);
    const router = useRouter();

    const onToggle = () => {
        form.reset(initialData);
        setIsEditing(!isEditing);
    };

    const onSubmit = async (values: FormValues) => {
        mutate(values, {
            onSuccess() {
                onToggle();
                toast.success("Title updated");
                router.refresh();
            },
        });
    };

    return (
        <div className="mt-6 p-4 border bg-slate-100 rounded-md shadow-md">
            <div className="flex items-center justify-between">
                <Label htmlFor={inputId} className="text-base font-medium">
                    Course title
                </Label>
                <Button variant="ghost" onClick={onToggle}>
                    {isEditing ? (
                        "Cancel"
                    ) : (
                        <>
                            <Pencil className="size-4 mr-2" />
                            Edit title
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && <p className="text-sm">{initialData.title}</p>}

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
                                className="space-y-4"
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
                                                    placeholder="e.g. 'Advanced web development'"
                                                    {...field}
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
