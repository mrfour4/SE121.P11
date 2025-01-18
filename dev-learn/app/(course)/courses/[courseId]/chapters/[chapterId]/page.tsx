import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getChapter } from "@/actions/get-chapter";

import { Separator } from "@/components/ui/separator";

import { Banner } from "@/components/banner";
import { Preview } from "@/components/preview";

import { FileIcon } from "lucide-react";

import { CourseProgressButton } from "@/features/chapter/components/course-progress-button";
import { CourseEnrollButton } from "@/features/chapter/components/enroll-button";
import { VideoPlayer } from "@/features/chapter/components/video-player";

type Props = {
    params: {
        courseId: string;
        chapterId: string;
    };
};

const ChapterPage = async ({ params }: Props) => {
    const { userId } = auth();

    if (!userId) {
        redirect("/");
    }

    const { chapterId, courseId } = params;

    const {
        course,
        chapter,
        muxData,
        attachments,
        nextChapter,
        userProgress,
        purchase,
    } = await getChapter({
        userId,
        courseId,
        chapterId,
    });

    if (!chapter || !course) {
        return redirect("/");
    }

    const isLocked = !chapter.isFree && !purchase;
    const completeOnEnd = !!purchase && !userProgress?.isCompleted;

    return (
        <div>
            {userProgress?.isCompleted && (
                <Banner
                    variant="success"
                    label="You already completed this chapter"
                />
            )}
            {isLocked && (
                <Banner
                    variant="warning"
                    label="You need to purchase this course to watch this chapter"
                />
            )}

            <div className="flex flex-col max-w-4xl mx-auto pb-20">
                <div className="p-4">
                    <VideoPlayer
                        playbackId={muxData?.playbackId!}
                        title={chapter.title}
                        chapterId={chapterId}
                        courseId={courseId}
                        nextChapterId={nextChapter?.id}
                        isLocked={isLocked}
                        completeOnEnd={completeOnEnd}
                    />
                </div>

                <div>
                    <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold mb-2">
                            {chapter.title}
                        </h2>
                        {purchase ? (
                            <CourseProgressButton
                                courseId={courseId}
                                chapterId={chapterId}
                                nextChapterId={nextChapter?.id}
                                isCompleted={!!userProgress?.isCompleted}
                            />
                        ) : (
                            <CourseEnrollButton
                                courseId={courseId}
                                price={course.price!}
                            />
                        )}
                    </div>

                    <Separator />

                    <div>
                        <Preview value={chapter.description!} />
                    </div>

                    {!!attachments && (
                        <>
                            <Separator />

                            <div className="p-4 space-y-2">
                                <p className="text-base font-medium">
                                    Attachments
                                </p>
                                {attachments.map((attachment) => (
                                    <a
                                        key={attachment.id}
                                        href={attachment.url}
                                        target="_blank"
                                        className="flex items-center p-3 w-full bg-sky-200 border rounded-md text-sky-700 hover:underline"
                                    >
                                        <FileIcon className="size-4 mr-2" />
                                        <span className="line-clamp-1 text-sm">
                                            {attachment.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChapterPage;
