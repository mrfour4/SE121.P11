import { db } from "@/lib/db";
import { Category, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

type CoursesWithProgress = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
};

type Params = {
    userId: string;
    title?: string;
    categoryId?: string;
};

export const getCourses = async ({
    userId,
    title,
    categoryId,
}: Params): Promise<CoursesWithProgress[]> => {
    try {
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                categoryId,
                title: {
                    contains: title?.toLowerCase(),
                    mode: "insensitive",
                },
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    },
                },
                purchases: {
                    where: {
                        userId,
                    },
                },
            },
            orderBy: {
                createAt: "desc",
            },
        });

        const coursesWithProgress = await Promise.all(
            courses.map(async (course) => {
                if (!course.purchases.length) {
                    return {
                        ...course,
                        progress: null,
                    };
                }

                const progressPercentage = await getProgress(userId, course.id);

                return {
                    ...course,
                    progress: progressPercentage,
                };
            })
        );
        return coursesWithProgress;
    } catch (error) {
        console.log("🚀 ~ getCourses ~ error:", error);
        return [];
    }
};
