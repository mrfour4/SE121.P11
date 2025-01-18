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
        const { url, name } = (await req.json()) as {
            url: string;
            name: string;
        };

        const ownerCourse = await db.course.findUnique({
            where: {
                id: courseId,
                userId,
            },
        });

        if (!ownerCourse) {
            return new NextResponse("Not found", { status: 404 });
        }

        const attachment = await db.attachment.create({
            data: {
                url,
                courseId,
                name: name || url,
            },
        });

        return NextResponse.json(attachment);
    } catch (error) {
        console.log("🚀 [COURSE_ID_ATTACHMENTS] ~ POST ~ error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
