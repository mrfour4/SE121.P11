"use client";

import { Attachment, Course } from "@prisma/client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";

import { FileUpload } from "@/components/file-upload";

import { Check, FileIcon, Loader, Pencil, PlusCircle, X } from "lucide-react";
import { toast } from "sonner";

import { useConfirm } from "@/hooks/use-confirm";
import { useCreateAttachment } from "../hooks/use-create-attachment";
import { useDeleteAttachment } from "../hooks/use-delete-attachment";
import { useUpdateAttachment } from "../hooks/use-update-attachment";

import { AttachmentUpdateForm } from "./attchment-update-form";

type Props = {
    initialData: Course & { attachments: Attachment[] };
    courseId: string;
};

export const AttachmentForm = ({ initialData, courseId }: Props) => {
    const [isEditing, setIsEditing] = useState(false);

    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const formId = useId();

    const { confirm, ConfirmDialog } = useConfirm(
        "Are you sure want delete attachment"
    );

    const createAttachment = useCreateAttachment(courseId);
    const deleteAttachment = useDeleteAttachment(courseId);
    const updateAttachment = useUpdateAttachment(courseId);

    const router = useRouter();

    const onToggle = () => {
        setIsEditing(!isEditing);
    };

    const onSubmit = async (values: { url: string; name: string }) => {
        console.log(values);
        createAttachment.mutate(values, {
            onSuccess() {
                onToggle();
                toast.success("Attachment created");
                router.refresh();
            },
        });
    };

    const onDelete = async (id: string) => {
        const ok = await confirm();

        if (!ok) return;

        console.log(id);

        setDeletingId(id);
        deleteAttachment.mutate(id, {
            onSuccess() {
                toast.success("Attachment deleted");
                router.refresh();
            },
            onSettled() {
                setDeletingId(null);
            },
        });
    };

    const onEdit = async (id: string, name: string) => {
        updateAttachment.mutate(
            {
                id,
                name,
            },
            {
                onSuccess() {
                    toast.success("Attachment updated");
                    router.refresh();
                },
                onSettled() {
                    setEditingId(null);
                },
            }
        );
    };

    const onCancel = (id: string) => {
        if (editingId === id) {
            setEditingId(null);
            return;
        }

        onDelete(id);
    };

    const isPending = updateAttachment.isPending || deleteAttachment.isPending;

    return (
        <>
            <ConfirmDialog />
            <div className="mt-6 p-4 border bg-slate-100 rounded-md shadow-md">
                <div className="flex items-center justify-between">
                    <p className="text-base font-medium">Course attachments</p>
                    <Button variant="ghost" onClick={onToggle}>
                        {isEditing && "Cancel"}

                        {!isEditing && (
                            <>
                                <PlusCircle className="size-4 mr-2" />
                                Add a file
                            </>
                        )}
                    </Button>
                </div>
                {!isEditing ? (
                    initialData.attachments.length === 0 ? (
                        <p className="text-sm mt-2 text-slate-500 italic">
                            No attachments yet
                        </p>
                    ) : (
                        <div className="space-y-2 mt-2">
                            {initialData.attachments.map((attachment) => (
                                <div
                                    key={attachment.id}
                                    className="flex items-center p-3 w-full bg-sky-100 border border-sky-200 text-sky-700 rounded-md"
                                >
                                    <FileIcon className="size-4 mr-2 flex-shrink-0" />

                                    {editingId === attachment.id ? (
                                        <AttachmentUpdateForm
                                            id={formId}
                                            initialData={attachment}
                                            onEdit={onEdit}
                                        />
                                    ) : (
                                        <p className="text-xs line-clamp-1">
                                            {attachment.name}
                                        </p>
                                    )}

                                    {isPending &&
                                        (editingId === attachment.id ||
                                            deletingId === attachment.id) && (
                                            <Loader className="size-4 animate-spin ml-auto" />
                                        )}

                                    {!isPending && (
                                        <div className="flex items-center gap-x-2 ml-auto">
                                            {editingId === attachment.id ? (
                                                <button
                                                    form={formId}
                                                    key="check"
                                                >
                                                    <Check className="size-4" />
                                                </button>
                                            ) : (
                                                <button key="edit">
                                                    <Pencil
                                                        className="size-4"
                                                        onClick={() =>
                                                            setEditingId(
                                                                attachment.id
                                                            )
                                                        }
                                                    />
                                                </button>
                                            )}

                                            <button>
                                                <X
                                                    className="size-4"
                                                    onClick={() =>
                                                        onCancel(attachment.id)
                                                    }
                                                />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <div>
                        <FileUpload
                            endpoint="courseAttachment"
                            onChange={(url, name) => onSubmit({ url, name })}
                        />

                        <p className="text-xs text-muted-foreground mt-4">
                            Add anything your students might need to complete
                            the course
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};
