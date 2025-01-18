"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Loader, Trash } from "lucide-react";
import { toast } from "sonner";

import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteChapter } from "../hooks/use-delete-chapter";
import { usePublishChapter } from "../hooks/use-publish-chapter";
import { useUnPublishChapter } from "../hooks/use-unpublish-chapter";

type Props = {
    disabled: boolean;
    courseId: string;
    chapterId: string;
    isPublished: boolean;
};

export const ChapterActions = ({
    disabled,
    courseId,
    chapterId,
    isPublished,
}: Props) => {
    const { ConfirmDialog, confirm } = useConfirm(
        "Are you sure want delete this chapter?"
    );

    const deleteChapter = useDeleteChapter(courseId);
    const publishChapter = usePublishChapter(courseId);
    const unPublishChapter = useUnPublishChapter(courseId);

    const router = useRouter();

    const onClick = async () => {
        if (isPublished) {
            unPublishChapter.mutate(chapterId, {
                onSuccess() {
                    toast.success("Chapter unPublished");
                    router.refresh();
                },
            });
        } else {
            publishChapter.mutate(chapterId, {
                onSuccess() {
                    toast.success("Chapter published");
                    router.push(`/teacher/courses/${courseId}`);
                    router.refresh();
                },
            });
        }
    };

    const onDelete = async () => {
        const ok = await confirm();

        if (!ok) return;

        deleteChapter.mutate(chapterId, {
            onSuccess() {
                toast.success("Chapter deleted");
                router.replace(`/teacher/courses/${courseId}`);
            },
        });
    };

    return (
        <>
            <ConfirmDialog />
            {deleteChapter.isPending && (
                <div className="absolute inset-0 bg-slate-500/40 flex items-center justify-center">
                    <Loader className="size-8 text-sky-700 animate-spin" />
                </div>
            )}
            <div className="flex items-center gap-x-2">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={onDelete}
                    disabled={deleteChapter.isPending}
                >
                    <Trash className="size-4" />
                </Button>
                <Button
                    size="sm"
                    disabled={
                        disabled ||
                        deleteChapter.isPending ||
                        publishChapter.isPending ||
                        unPublishChapter.isPending
                    }
                    onClick={onClick}
                >
                    {isPublished ? "UnPublish" : "Publish"}
                </Button>
            </div>
        </>
    );
};
