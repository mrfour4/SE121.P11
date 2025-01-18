"use client";

import { Course } from "@prisma/client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

import { Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Combobox } from "@/components/combobox";
import { useUpdateCourse } from "../hooks/use-update-course";

const formSchema = z.object({
    categoryId: z.string().min(1, {
        message: "Select an category",
    }),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
    courseId: string;
    initialData: Course;
    options: { label: string; value: string }[];
};

export const CategoryForm = ({ courseId, initialData, options }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const inputId = useId();

    const defaultValues = {
        categoryId: initialData.categoryId || "",
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
                toast.success("Description updated");
                router.refresh();
            },
        });
    };

    const selectedOption = options.find(
        (option) => option.value === initialData.categoryId
    );

    return (
        <div className="mt-6 p-4 border bg-slate-100 rounded-md shadow-md">
            <div className="flex items-center justify-between">
                <Label htmlFor={inputId} className="text-base font-medium">
                    Course category
                </Label>
                <Button variant="ghost" onClick={onToggle}>
                    {isEditing ? (
                        "Cancel"
                    ) : (
                        <>
                            <Pencil className="size-4 mr-2" />
                            Edit category
                        </>
                    )}
                </Button>
            </div>
            {!isEditing ? (
                <p
                    className={cn(
                        "text-sm mt-2",
                        !initialData.categoryId && "text-slate-500 italic"
                    )}
                >
                    {selectedOption?.label || "No category"}
                </p>
            ) : (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <Combobox
                                        options={options}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />

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
            )}
        </div>
    );
};
