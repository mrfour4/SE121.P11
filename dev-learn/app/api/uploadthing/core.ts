import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth();

    if (!userId) {
        throw new UploadThingError("You must be logged in to upload");
    }

    return { userId };
};

export const ourFileRouter = {
    courseImage: f({ image: { maxFileCount: 1 } })
        .middleware(handleAuth)
        .onUploadComplete(() => {}),

    courseAttachment: f(["text", "image", "video", "audio", "pdf"])
        .middleware(handleAuth)
        .onUploadComplete(() => {}),

    chapterVideo: f({ video: { maxFileSize: "16GB", maxFileCount: 1 } })
        .middleware(handleAuth)
        .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
