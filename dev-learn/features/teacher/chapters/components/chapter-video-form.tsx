"use client";

import { Chapter, MuxData } from "@prisma/client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

import { Pencil, PlusCircle, VideoIcon } from "lucide-react";
import { toast } from "sonner";

import { FileUpload } from "@/components/file-upload";
import MuxPlayer from "@mux/mux-player-react";

import { useUpdateChapter } from "../hooks/use-update-chapter";

type Props = {
    initialData: Chapter & { muxData?: MuxData | null };
    courseId: string;
    chapterId: string;
};

export const ChapterVideoForm = ({
    initialData,
    courseId,
    chapterId,
}: Props) => {
    const [isEditing, setIsEditing] = useState(false);

    const { mutate } = useUpdateChapter({ courseId, id: chapterId });
    const router = useRouter();

    const onToggle = () => {
        setIsEditing(!isEditing);
    };

    const onSubmit = async (values: { videoUrl: string }) => {
        mutate(values, {
            onSuccess() {
                onToggle();
                toast.success("Video updated");
                router.refresh();
            },
        });
    };

    return (
        <div className="mt-6 p-4 border bg-slate-100 rounded-md shadow-md">
            <div className="flex items-center justify-between">
                <p className="text-base font-medium">Chapter video</p>
                <Button variant="ghost" onClick={onToggle}>
                    {isEditing && "Cancel"}

                    {!isEditing &&
                        (!initialData.videoUrl ? (
                            <>
                                <PlusCircle className="size-4 mr-2" />
                                Add a video
                            </>
                        ) : (
                            <>
                                <Pencil className="size-4 mr-2" />
                                Edit video
                            </>
                        ))}
                </Button>
            </div>
            {!isEditing ? (
                !initialData.videoUrl ? (
                    <div className="h-60 flex items-center justify-center bg-slate-200 rounded-md">
                        <VideoIcon className="size-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="mt-2">
                        <AspectRatio ratio={16 / 9} className="relative">
                            <MuxPlayer
                                playbackId={
                                    initialData.muxData?.playbackId || ""
                                }
                            />
                        </AspectRatio>
                    </div>
                )
            ) : (
                <div>
                    <FileUpload
                        endpoint="chapterVideo"
                        onChange={(url) => onSubmit({ videoUrl: url })}
                    />

                    <p className="text-xs text-muted-foreground mt-4">
                        Upload this chapter&apos;s video
                    </p>
                </div>
            )}

            {initialData.videoUrl && !isEditing && (
                <p className="text-xs text-muted-foreground mt-2">
                    Video can take a few minutes to process. Refresh the page if
                    video does not appear
                </p>
            )}
        </div>
    );
};
