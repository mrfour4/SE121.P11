import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type Params = {
    params: { courseId: string };
};

export async function PATCH(req: Request, { params }: Params) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { courseId } = params;

        const ownerCourse = await db.course.findUnique({
            where: {
                userId,
                id: courseId,
            },
            include: {
                chapters: {
                    where: {
                        isPublished: true,
                    },
                },
            },
        });

        if (!ownerCourse) {
            return new NextResponse("Not found", { status: 404 });
        }

        const {
            title,
            description,
            imageUrl,
            categoryId,
            chapters: publishedChapters,
        } = ownerCourse;

        if (
            !title ||
            !description ||
            !imageUrl ||
            !categoryId ||
            !publishedChapters.length
        ) {
            return new NextResponse("Missing require fields", { status: 400 });
        }

        const publishedCourse = await db.course.update({
            where: {
                id: courseId,
                userId,
            },
            data: {
                isPublished: true,
            },
        });

        return NextResponse.json(publishedCourse);
    } catch (error) {
        console.log("🚀 [COURSE_ID_PUBLISH] ~ PATCH ~ error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
