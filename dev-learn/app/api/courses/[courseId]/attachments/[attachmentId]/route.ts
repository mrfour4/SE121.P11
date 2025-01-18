import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { utDeleteFile } from "@/lib/ulapi";
import { Attachment } from "@prisma/client";

type UpdateData = Partial<Attachment>;

type Params = {
    params: { courseId: string; attachmentId: string };
};

export async function PATCH(req: Request, { params }: Params) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { courseId, attachmentId } = params;

        const attachment = await db.attachment.findUnique({
            where: {
                id: attachmentId,
                courseId,
            },
        });

        if (!attachment) {
            return new NextResponse("Not found", { status: 404 });
        }

        const { name }: UpdateData = await req.json();

        if (!name) {
            return new NextResponse("Missing field name", { status: 400 });
        }

        const updatedAttachment = await db.attachment.update({
            where: {
                id: attachmentId,
                courseId,
            },
            data: {
                name,
            },
        });

        return NextResponse.json(updatedAttachment);
    } catch (error) {
        console.log("🚀 [ATTACHMENT_ID] ~ DELETE ~ error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: Params) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { courseId, attachmentId } = params;

        const ownerAttachment = await db.attachment.findUnique({
            where: {
                id: attachmentId,
                courseId,
            },
        });

        if (!ownerAttachment) {
            return new NextResponse("Not found", { status: 404 });
        }

        const attachment = await db.attachment.delete({
            where: {
                courseId,
                id: attachmentId,
            },
        });

        await utDeleteFile(attachment.name);

        return NextResponse.json(attachment);
    } catch (error) {
        console.log("🚀 [ATTACHMENT_ID] ~ DELETE ~ error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
