import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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

        const { title, description, videoUrl, muxData } = chapter;

        if (!title || !description || !videoUrl || !muxData) {
            return new NextResponse("Missing require fields", { status: 400 });
        }

        const publishedChapter = await db.chapter.update({
            where: {
                id: chapterId,
                courseId,
            },
            data: {
                isPublished: true,
            },
        });

        return NextResponse.json(publishedChapter);
    } catch (error) {
        console.log("🚀 [CHAPTER_ID_PUBLISH] ~ PATCH ~ error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
