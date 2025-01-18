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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

import { useUpdateCourse } from "../hooks/use-update-course";

const formSchema = z.object({
    description: z.string().min(1, {
        message: "Description has least 1 character",
    }),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
    initialData: Course;
    courseId: string;
};

export const DescriptionForm = ({ initialData, courseId }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const inputId = useId();

    const defaultValues = {
        description: initialData.description || "",
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const { mutate, isPending } = useUpdateCourse(courseId);
    const router = useRouter();

    const onToggle = () => {
        console.log(defaultValues);
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
                    Course description
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
                <p
                    className={cn(
                        "text-sm mt-2",
                        !initialData.description && "text-slate-500 italic"
                    )}
                >
                    {initialData.description || "No description"}
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
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    id={inputId}
                                                    className="bg-white"
                                                    placeholder="e.g. 'This course is about...'"
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
