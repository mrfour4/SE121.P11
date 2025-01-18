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

import { Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";
import { useUpdateCourse } from "../hooks/use-update-course";

const formSchema = z.object({
    price: z.coerce.number(),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
    initialData: Course;
    courseId: string;
};

export const PriceForm = ({ initialData, courseId }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const inputId = useId();

    const defaultValues = {
        price: initialData.price || 0,
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const { mutate, isPending } = useUpdateCourse(courseId);
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
                toast.success("Price updated");
                router.refresh();
            },
        });
    };

    return (
        <div className="mt-6 p-4 border bg-slate-100 rounded-md shadow-md">
            <div className="flex items-center justify-between">
                <Label htmlFor={inputId} className="text-base font-medium">
                    Course price
                </Label>
                <Button variant="ghost" onClick={onToggle}>
                    {isEditing ? (
                        "Cancel"
                    ) : (
                        <>
                            <Pencil className="size-4 mr-2" />
                            Edit price
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p
                    className={cn(
                        "text-sm mt-2",
                        !initialData.price && "text-slate-500 italic"
                    )}
                >
                    {initialData.price
                        ? formatPrice(initialData.price)
                        : "No price"}
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
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    id={inputId}
                                                    type="number"
                                                    step="0.01"
                                                    className="bg-white"
                                                    placeholder="Set a price for your course"
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
