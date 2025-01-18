import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type Params = {
    params: { courseId: string };
};

export async function POST(req: Request, { params }: Params) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { courseId } = params;

        const isCourseOwner = await db.course.findUnique({
            where: {
                id: courseId,
                userId,
            },
        });

        if (!isCourseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { title, position } = await req.json();

        const chapter = await db.chapter.create({
            data: {
                title,
                position,
                userId,
                courseId: courseId,
            },
        });

        return NextResponse.json(chapter);
    } catch (error) {
        console.log("🚀 [COURSE_ID_CHAPTERS] ~ POST ~ error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
