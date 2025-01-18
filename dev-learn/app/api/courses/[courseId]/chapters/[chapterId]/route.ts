import { Chapter } from "@prisma/client";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { muxCreateAsset, muxDeleteAsset } from "@/lib/mux";
import { utDeleteFile } from "@/lib/ulapi";

type UpdateData = Partial<Chapter>;

type Params = {
    params: { courseId: string; chapterId: string };
};

export async function PATCH(req: Request, { params }: Params) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { courseId, chapterId } = params;

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                userId,
            },
            include: {
                muxData: true,
            },
        });

        if (!chapter) {
            return new NextResponse("Not found", { status: 404 });
        }

        const { isPublished, ...values }: UpdateData = await req.json();

        if (values.videoUrl) {
            // update video
            if (chapter.videoUrl) {
                // clear old video
                await utDeleteFile(chapter.videoUrl);

                if (chapter.muxData) {
                    await muxDeleteAsset(chapter.muxData.assetId);
                    await db.muxData.delete({
                        where: {
                            id: chapter.muxData.id,
                        },
                    });
                }
            }

            const asset = await muxCreateAsset({
                input: [{ url: values.videoUrl }],
                playback_policy: ["public"],
                test: false,
            });

            await db.muxData.create({
                data: {
                    chapterId,
                    assetId: asset.id,
                    playbackId: asset.playback_ids?.[0]?.id,
                },
            });
        }

        const updatedChapter = await db.chapter.update({
            where: {
                id: chapterId,
                userId,
                courseId,
            },
            data: {
                ...values,
            },
        });

        return NextResponse.json(updatedChapter);
    } catch (error) {
        console.log("🚀 [CHAPTER_ID] ~ PATCH ~ error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: Params) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { courseId, chapterId } = params;

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                userId,
                courseId,
            },
            include: {
                muxData: true,
            },
        });

        if (!chapter) {
            return new NextResponse("Not found", { status: 404 });
        }

        if (chapter.videoUrl) {
            await utDeleteFile(chapter.videoUrl);

            if (chapter.muxData?.assetId) {
                await muxDeleteAsset(chapter.muxData.assetId);
            }
        }

        const deletedChapter = await db.chapter.delete({
            where: {
                userId,
                courseId,
                id: chapterId,
            },
        });

        const publishedChaptersInCourse = await db.chapter.findMany({
            where: {
                courseId,
                isPublished: true,
            },
        });

        if (!publishedChaptersInCourse.length) {
            await db.course.update({
                where: {
                    id: courseId,
                },
                data: {
                    isPublished: false,
                },
            });
        }

        return NextResponse.json(deletedChapter);
    } catch (error) {
        console.log("🚀 [CHAPTER_ID] ~ DELETE ~ error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
