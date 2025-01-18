import { db } from "@/lib/db";
import { muxDeleteAsset } from "@/lib/mux";
import { utDeleteFiles } from "@/lib/ulapi";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { ids }: { ids: string[] } = await req.json();

        const courses = await db.course.findMany({
            where: {
                id: {
                    in: ids,
                },
                userId,
            },
            include: {
                chapters: {
                    include: {
                        muxData: true,
                    },
                },
                attachments: true,
            },
        });

        if (!courses) {
            return new NextResponse("Not found", { status: 404 });
        }

        const imageUrls: string[] = [];
        const attachmentIds: string[] = [];
        const videoUrls: string[] = [];
        const muxAssetIds: string[] = [];

        courses.forEach((course) => {
            if (course.imageUrl) {
                imageUrls.push(course.imageUrl);
            }

            attachmentIds.push(
                ...course.attachments.map((attachment) => attachment.name)
            );

            course.chapters.forEach((chapter) => {
                if (chapter.videoUrl) {
                    videoUrls.push(chapter.videoUrl);
                }

                if (chapter.muxData?.assetId) {
                    muxAssetIds.push(chapter.muxData.assetId);
                }
            });
        });

        await Promise.all([
            utDeleteFiles([...imageUrls, ...attachmentIds, ...videoUrls]),
            ...muxAssetIds.map((assetId) => muxDeleteAsset(assetId)),
        ]);

        const deletedCourses = await db.course.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });

        return NextResponse.json(deletedCourses);
    } catch (error) {
        console.log("🚀 COURSE ~ POST ~ error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
