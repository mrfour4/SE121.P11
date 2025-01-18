"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import MuxPlayer from "@mux/mux-player-react";

import { cn } from "@/lib/utils";
import { Loader, Lock } from "lucide-react";
import { toast } from "sonner";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { useUserProgress } from "../hooks/use-user-progress";

type Props = {
    playbackId: string;
    courseId: string;
    chapterId: string;
    nextChapterId?: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    title: string;
};

export const VideoPlayer = ({
    playbackId,
    title,
    courseId,
    chapterId,
    completeOnEnd,
    isLocked,
    nextChapterId,
}: Props) => {
    const [isReady, setIsReady] = useState(false);

    const openConfetti = useConfettiStore((state) => state.onOpen);

    const { mutate } = useUserProgress({ courseId, chapterId });
    const router = useRouter();

    const onEnded = () => {
        mutate(
            { isCompleted: true },
            {
                onSuccess() {
                    if (!nextChapterId) {
                        openConfetti();
                    }

                    if (nextChapterId) {
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
        <AspectRatio ratio={16 / 9} className="relative">
            {!isReady && !isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                    <Loader className="size-8 animate-spin text-secondary" />
                    <p className="text-sm">Loading video</p>
                </div>
            )}
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                    <Lock className="size-8" />
                    <p className="text-sm">This chapter is locked</p>
                </div>
            )}
            {!isLocked && (
                <MuxPlayer
                    title={title}
                    className={cn(!isReady && "hidden")}
                    onCanPlay={() => setIsReady(true)}
                    onEnded={onEnded}
                    playbackId={playbackId}
                />
            )}
        </AspectRatio>
    );
};
