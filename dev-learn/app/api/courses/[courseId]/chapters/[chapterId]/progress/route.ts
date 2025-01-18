import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type Params = {
    params: { courseId: string; chapterId: string };
};
export async function PUT(req: Request, { params }: Params) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { chapterId } = params;
        const { isCompleted } = await req.json();

        const userProgress = await db.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId,
                },
            },
            update: {
                isCompleted,
            },
            create: {
                userId,
                chapterId,
                isCompleted,
            },
        });

        return NextResponse.json(userProgress);
    } catch (error) {
        console.log("🚀 [CHAPTER_ID_PROGRESS] ~ PUT ~ error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
