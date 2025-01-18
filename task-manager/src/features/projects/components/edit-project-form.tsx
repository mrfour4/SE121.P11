"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { projectSchema } from "../schemas";

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
import { ArrowLeft, ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Project } from "@/types";

import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteProject } from "../api/use-delete-project";
import { useUpdateProject } from "../api/use-update-project";

type FormValues = z.infer<typeof projectSchema>;
const MAX_SIZE = 1 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

type Props = {
    onCancel?: () => void;
    initialData: Project;
};

export const EditProjectForm = ({ onCancel, initialData }: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(projectSchema.omit({ workspaceId: true })),
        defaultValues: {
            ...initialData,
            image: initialData.imageUrl ?? "",
        },
    });

    const { ConfirmDialog, confirm } = useConfirm({
        title: "Delete Project",
        message: "Are you sure you want to delete this project?",
    });

    const inputRef = useRef<HTMLInputElement>(null);
    const previewUrl = useRef<string>(initialData.imageUrl ?? "");

    const router = useRouter();

    const { mutate, isPending } = useUpdateProject();
    const deleteWorkspace = useDeleteProject();

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

    const onSubmit = (values: FormValues) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : "",
            workspaceId: initialData.workspaceId,
        };

        mutate(
            { form: finalValues, param: { projectId: initialData.$id } },
            {
                onSuccess: ({ data }) => {
                    form.reset();
                    router.push(
                        `/workspaces/${initialData.workspaceId}/projects/${data.$id}`,
                    );
                },
            },
        );
    };

    const onDelete = async () => {
        const ok = await confirm();
        if (!ok) return;

        deleteWorkspace.mutate(
            { param: { projectId: initialData.$id } },
            {
                onSuccess: () => {
                    router.push("/");
                },
            },
        );
    };

    const isLoading = isPending || deleteWorkspace.isPending;

    return (
        <div className="space-y-4">
            <ConfirmDialog />
            <Card className="size-full border-none shadow-none">
                <CardHeader className="flex-row items-center gap-x-4 space-y-0 p-7">
                    <Button
                        size="sm"
                        variant="link"
                        onClick={
                            onCancel
                                ? onCancel
                                : () =>
                                      router.push(
                                          `/workspaces/${initialData.workspaceId}/projects/${initialData.$id}`,
                                      )
                        }
                        className="border-none shadow-none"
                    >
                        <ArrowLeft />
                        Back
                    </Button>
                    <CardTitle className="text-xl font-bold">
                        {initialData.name}
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
                                        <FormLabel>Project Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter project name"
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
                                                            previewUrl.current ||
                                                            ""
                                                        }
                                                        alt="Project Logo"
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
                                                    Project Logo
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    JPG, PNG or JPEG, max 1MB
                                                </p>

                                                <input
                                                    ref={inputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={onImageChange}
                                                />

                                                {field.value ? (
                                                    <Button
                                                        type="button"
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
                                    disabled={isLoading}
                                    className={cn(!onCancel && "invisible")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={isLoading}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="size-full border-none shadow-none">
                <CardContent className="p-7">
                    <div className="flex flex-col">
                        <h3 className="font-bold">Danger Zone</h3>
                        <p className="text-sm text-muted-foreground">
                            Delete a project will permanently remove it from
                            your workspace.
                        </p>
                        <Button
                            className="ml-auto mt-6 w-fit"
                            size="sm"
                            variant="destructive"
                            type="button"
                            disabled={isLoading}
                            onClick={onDelete}
                        >
                            Delete Workspace
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
