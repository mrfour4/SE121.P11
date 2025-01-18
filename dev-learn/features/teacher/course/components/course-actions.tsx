"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Loader, Trash } from "lucide-react";
import { toast } from "sonner";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { useConfirm } from "@/hooks/use-confirm";

import { useDeleteCourse } from "../hooks/use-delete-course";
import { usePublishCourse } from "../hooks/use-publish-course";
import { useUnPublishCourse } from "../hooks/use-unpublish-course";

type Props = {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
};

export const CourseActions = ({ disabled, courseId, isPublished }: Props) => {
    const { ConfirmDialog, confirm } = useConfirm(
        "Are you sure want delete this course?"
    );

    const openConfetti = useConfettiStore((state) => state.onOpen);

    const deleteCourse = useDeleteCourse();
    const publishCourse = usePublishCourse();
    const unPublishCourse = useUnPublishCourse();

    const router = useRouter();

    const onClick = async () => {
        if (isPublished) {
            unPublishCourse.mutate(courseId, {
                onSuccess() {
                    toast.success("Course unPublished");
                    router.refresh();
                },
            });
        } else {
            publishCourse.mutate(courseId, {
                onSuccess() {
                    toast.success("Course published");
                    router.refresh();
                    openConfetti();
                },
            });
        }
    };

    const onDelete = async () => {
        const ok = await confirm();

        if (!ok) return;

        deleteCourse.mutate(courseId, {
            onSuccess() {
                toast.success("Course deleted");
                router.replace(`/teacher/courses`);
            },
        });
    };

    return (
        <>
            <ConfirmDialog />
            {deleteCourse.isPending && (
                <div className="absolute inset-0 bg-slate-500/40 flex items-center justify-center z-10">
                    <Loader className="size-8 text-sky-700 animate-spin" />
                </div>
            )}
            <div className="flex items-center gap-x-2">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={onDelete}
                    disabled={deleteCourse.isPending}
                >
                    <Trash className="size-4" />
                </Button>
                <Button
                    size="sm"
                    disabled={
                        disabled ||
                        deleteCourse.isPending ||
                        publishCourse.isPending ||
                        unPublishCourse.isPending
                    }
                    onClick={onClick}
                >
                    {isPublished ? "UnPublish" : "Publish"}
                </Button>
            </div>
        </>
    );
};
