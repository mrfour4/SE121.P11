"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});

export type CreateFormValues = z.infer<typeof formSchema>;

interface Props extends React.ComponentProps<"form"> {
    id: string;
    onCreate: (values: CreateFormValues) => void;
}

export const CreateCourseForm = ({ id, className, onCreate }: Props) => {
    const form = useForm<CreateFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    return (
        <Form {...form}>
            <form
                id={id}
                onSubmit={form.handleSubmit(onCreate)}
                className={cn("space-y-8", className)}
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Course title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="e.g. 'Advanced web development'"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                What will you teach in this course?
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};
