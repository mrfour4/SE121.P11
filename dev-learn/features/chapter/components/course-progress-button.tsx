"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { CheckCircle, XCircle } from "lucide-react";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { toast } from "sonner";

import { useUserProgress } from "../hooks/use-user-progress";

type Props = {
    chapterId: string;
    courseId: string;
    isCompleted?: boolean;
    nextChapterId?: string;
};

export const CourseProgressButton = ({
    chapterId,
    courseId,
    isCompleted,
    nextChapterId,
}: Props) => {
    const openConfetti = useConfettiStore((state) => state.onOpen);

    const { mutate, isPending } = useUserProgress({ courseId, chapterId });
    const router = useRouter();

    const Icon = isCompleted ? XCircle : CheckCircle;

    const onClick = () => {
        mutate(
            { isCompleted: !isCompleted },
            {
                onSuccess() {
                    if (!isCompleted && !nextChapterId) {
                        console.log("End");
                        openConfetti();
                    }

                    if (!isCompleted && nextChapterId) {
                        router.push(
                            `/courses/${courseId}/chapters/${nextChapterId}`
                        );
                    }

                    toast.success("Progress updated");
                    router.refresh();
                },
            }
        );
    };

    return (
        <Button
            type="button"
            className="w-full md:w-auto"
            variant={isCompleted ? "outline" : "success"}
            onClick={onClick}
            disabled={isPending}
        >
            {isCompleted ? "Not completed" : "Mark as complete"}
            <Icon className="size-4 ml-2 " />
        </Button>
    );
};
