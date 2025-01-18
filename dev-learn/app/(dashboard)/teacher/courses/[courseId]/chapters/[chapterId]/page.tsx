import Link from "next/link";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import { ArrowLeft, Eye, LayoutDashboard, VideoIcon } from "lucide-react";

import { Banner } from "@/components/banner";
import { IconBadge } from "@/components/icon-badge";

import { ChapterAccessForm } from "@/features/teacher/chapters/components/chapter-access-form";
import { ChapterActions } from "@/features/teacher/chapters/components/chapter-actions";
import { ChapterDescriptionForm } from "@/features/teacher/chapters/components/chapter-description-form";
import { ChapterTitleForm } from "@/features/teacher/chapters/components/chapter-title-form";
import { ChapterVideoForm } from "@/features/teacher/chapters/components/chapter-video-form";

type Props = {
    params: {
        courseId: string;
        chapterId: string;
    };
};

const ChapterPage = async ({ params }: Props) => {
    const { courseId, chapterId } = params;

    const { userId } = auth();

    if (!userId) {
        redirect("/");
    }

    const chapter = await db.chapter.findUnique({
        where: {
            userId,
            courseId,
            id: chapterId,
        },
        include: {
            muxData: true,
        },
    });

    if (!chapter) {
        redirect("/");
    }

    const { title, description, videoUrl } = chapter;
    const requiredFields = [title, description, videoUrl];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    return (
        <>
            {!chapter.isPublished && (
                <Banner label="This chapter is unpublished. It will not be visible in the course" />
            )}

            <div className="p-6 relative">
                <div className="flex items-center justify-between">
                    <div className="w-full">
                        <Link
                            href={`/teacher/courses/${courseId}`}
                            className="flex items-center text-sm hover:opacity-75 transition mb-6"
                        >
                            <ArrowLeft className="size-4 mr-2" />
                            Back to course setup
                        </Link>

                        <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col gap-y-2">
                                <h1 className="text-2xl font-medium">
                                    Chapter Creation
                                </h1>
                                <span className="text-sm text-slate-700">
                                    Complete all fields ({completedFields}/
                                    {totalFields})
                                </span>
                            </div>

                            <ChapterActions
                                disabled={completedFields < totalFields}
                                courseId={courseId}
                                chapterId={chapterId}
                                isPublished={chapter.isPublished}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={LayoutDashboard} />
                                <h2 className="text-xl">
                                    Customize your chapter
                                </h2>
                            </div>

                            <ChapterTitleForm
                                initialData={chapter}
                                chapterId={chapterId}
                                courseId={courseId}
                            />

                            <ChapterDescriptionForm
                                initialData={chapter}
                                chapterId={chapterId}
                                courseId={courseId}
                            />
                        </div>

                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Eye} />
                                <h2 className="text-xl">Access settings</h2>
                            </div>

                            <ChapterAccessForm
                                initialData={chapter}
                                chapterId={chapterId}
                                courseId={courseId}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={VideoIcon} />
                            <h2 className="text-xl">Add a video</h2>
                        </div>

                        <ChapterVideoForm
                            initialData={chapter}
                            chapterId={chapterId}
                            courseId={courseId}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChapterPage;
