"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { workspaceSchema } from "../schemas";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { DotSeparator } from "@/components/dot-separator";

import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

import { useCreateWorkspace } from "../api/use-create-workspace";

type FormValues = z.infer<typeof workspaceSchema>;
const MAX_SIZE = 1 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

type Props = {
    onCancel?: () => void;
};

export const CreateWorkspaceForm = ({ onCancel }: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(workspaceSchema),
        defaultValues: {
            name: "",
        },
    });

    const inputRef = useRef<HTMLInputElement>(null);
    const previewUrl = useRef<string | null>(null);

    const router = useRouter();

    const { mutate, isPending } = useCreateWorkspace();

    const onSubmit = (values: FormValues) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : "",
        };

        mutate(
            { form: finalValues },
            {
                onSuccess: ({ data }) => {
                    form.reset();
                    router.push(`/workspaces/${data.$id}`);
                },
            },
        );
    };

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            form.clearErrors("image");
            if (file.size > MAX_SIZE) {
                form.setError("image", {
                    type: "fileSize",
                    message: "The file size is too large. Max 1MB is allowed.",
                });
                return;
            }

            if (!ALLOWED_TYPES.includes(file.type)) {
                form.setError("image", {
                    type: "fileType",
                    message:
                        "The file type is not supported. Only JPG, PNG or JPEG are allowed.",
                });
                return;
            }

            form.setValue("image", file);

            if (previewUrl.current) {
                URL.revokeObjectURL(previewUrl.current);
            }

            previewUrl.current = URL.createObjectURL(file);
        }
    };

    return (
        <Card className="size-full border-none shadow-none">
            <CardHeader className="p-7">
                <CardTitle className="text-xl font-bold">
                    Create a new workspace
                </CardTitle>
            </CardHeader>

            <div className="px-7">
                <DotSeparator />
            </div>

            <CardContent className="p-7">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Workspace Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter workspace name"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <div className="flex items-center gap-x-5">
                                        {field.value ? (
                                            <div className="relative size-[72px] overflow-hidden rounded-md">
                                                <Image
                                                    src={
                                                        previewUrl.current || ""
                                                    }
                                                    alt="Workspace Logo"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <Avatar className="size-[72px]">
                                                <AvatarFallback>
                                                    <ImageIcon className="size-9 text-neutral-400" />
                                                </AvatarFallback>
                                            </Avatar>
                                        )}

                                        <div>
                                            <p className="text-sm">
                                                Workspace Icon
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                JPG, PNG or JPEG, max 1MB
                                            </p>

                                            <input
                                                ref={inputRef}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                disabled={isPending}
                                                onChange={onImageChange}
                                            />

                                            {field.value ? (
                                                <Button
                                                    type="button"
                                                    disabled={isPending}
                                                    variant="destructive"
                                                    size="xs"
                                                    className="mt-2 w-fit"
                                                    onClick={() => {
                                                        field.onChange("");
                                                    }}
                                                >
                                                    Remove Image
                                                </Button>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    disabled={isPending}
                                                    variant="tertiary"
                                                    size="xs"
                                                    className="mt-2 w-fit"
                                                    onClick={() =>
                                                        inputRef.current?.click()
                                                    }
                                                >
                                                    Upload Image
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="!mt-7 flex items-center justify-between">
                            <Button
                                type="button"
                                size="lg"
                                variant="secondary"
                                onClick={onCancel}
                                disabled={isPending}
                                className={cn(!onCancel && "invisible")}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isPending}
                            >
                                Create Workspace
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
