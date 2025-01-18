import { db } from "@/lib/db";

export const getProgress = async (userId: string, courseId: string) => {
    try {
        const publishedChapter = await db.chapter.findMany({
            where: {
                courseId,
                isPublished: true,
            },
            select: {
                id: true,
            },
        });

        const publishedChapterIds = publishedChapter.map(
            (chapter) => chapter.id
        );

        const validChapterCompleted = await db.userProgress.count({
            where: {
                userId,
                isCompleted: true,
                chapterId: {
                    in: publishedChapterIds,
                },
            },
        });

        const progressPercentage =
            (validChapterCompleted * 100) / publishedChapterIds.length;

        return progressPercentage;
    } catch (error) {
        console.log("🚀 ~ getProgress - error:", error);
        return 0;
    }
};
