"use client";

import { Attachment } from "@prisma/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "File name required",
    }),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
    id?: string;
    initialData: Attachment;
    onEdit: (id: string, name: string) => void;
};

export const AttachmentUpdateForm = ({ id, initialData, onEdit }: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData.name,
        },
    });

    function onSubmit(values: FormValues) {
        onEdit(initialData.id, values.name);
    }

    return (
        <Form {...form}>
            <form
                id={id}
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full mr-2"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="bg-white"
                                    placeholder="Attachment name"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};
