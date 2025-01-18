"use client";

import { Workspace } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef } from "react";

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
import { ArrowLeft, Copy, ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { useResetInviteCode } from "../api/use-reset-code";
import { useUpdateWorkspace } from "../api/use-update-workspace";

type FormValues = z.infer<typeof workspaceSchema>;
const MAX_SIZE = 1 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

type Props = {
    onCancel?: () => void;
    initialData: Workspace;
};

export const EditWorkspaceForm = ({ onCancel, initialData }: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(workspaceSchema),
        defaultValues: {
            ...initialData,
            image: initialData.imageUrl ?? "",
        },
    });

    useEffect(() => {
        form.setValue("name", initialData.name);
        form.setValue("image", initialData.imageUrl ?? "");
    }, [form, initialData]);

    const { ConfirmDialog, confirm } = useConfirm({
        title: "Delete Workspace",
        message:
            "This action cannot be undone. Are you sure you want to delete this workspace?",
        variant: "destructive",
    });

    const { ConfirmDialog: ResetDialog, confirm: confirmReset } = useConfirm({
        title: "Reset invite link",
        message:
            "This will invalidate the current invite link. Are you sure you want to reset the invite link?",
        variant: "destructive",
    });

    const inputRef = useRef<HTMLInputElement>(null);
    const previewUrl = useRef<string>(initialData.imageUrl ?? "");

    const router = useRouter();

    const { mutate, isPending } = useUpdateWorkspace();
    const deleteWorkspace = useDeleteWorkspace();
    const resetInviteCode = useResetInviteCode();

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
        };

        mutate(
            { form: finalValues, param: { workspaceId: initialData.$id } },
            {
                onSuccess: () => {
                    form.reset();
                },
            },
        );
    };

    const onDelete = async () => {
        const ok = await confirm();
        if (!ok) return;

        deleteWorkspace.mutate(
            { param: { workspaceId: initialData.$id } },
            {
                onSuccess: () => {
                    router.push("/");
                },
            },
        );
    };

    const isLoading =
        isPending || deleteWorkspace.isPending || resetInviteCode.isPending;
    const fullInviteLink = `${window.location.origin}/workspaces/${initialData.$id}/join/${initialData.inviteCode}`;

    const onCopy = () => {
        navigator.clipboard
            .writeText(fullInviteLink)
            .then(() => toast.success("Link copied to clipboard"));
    };

    const onResetCode = async () => {
        const ok = await confirmReset();
        if (!ok) return;

        resetInviteCode.mutate(
            { param: { workspaceId: initialData.$id } },
            {
                onSuccess: () => {
                    toast.success("Workspace invite code reset successfully");
                },
            },
        );
    };

    return (
        <div className="space-y-4">
            <ConfirmDialog />
            <ResetDialog />
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
                                          `/workspaces/${initialData.$id}`,
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
                                                            previewUrl.current ||
                                                            ""
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
                        <h3 className="font-bold">Invite Members</h3>
                        <p className="text-sm text-muted-foreground">
                            Share this link with your team members to invite
                            them to this workspace.
                        </p>
                        <div className="mt-4">
                            <div className="flex items-center gap-x-2">
                                <Input
                                    value={fullInviteLink}
                                    readOnly
                                    className="flex-grow"
                                />
                                <Button
                                    size="xs"
                                    variant="secondary"
                                    onClick={onCopy}
                                >
                                    <Copy />
                                </Button>
                            </div>
                        </div>

                        <Button
                            className="ml-auto mt-6 w-fit"
                            size="sm"
                            variant="tertiary"
                            type="button"
                            disabled={isLoading}
                            onClick={onResetCode}
                        >
                            Reset Invite Link
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="size-full border-none shadow-none">
                <CardContent className="p-7">
                    <div className="flex flex-col">
                        <h3 className="font-bold">Danger Zone</h3>
                        <p className="text-sm text-muted-foreground">
                            Deleting a workspace is irreversible and will remove
                            all associated data.
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
