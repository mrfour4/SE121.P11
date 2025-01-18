import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

type CourseWithProgress = Course & {
    category: Category;
    chapters: Chapter[];
    progress: number | null;
};

type DashboardCourses = {
    completedCourses: CourseWithProgress[];
    coursesInProgress: CourseWithProgress[];
};

export const getDashboardCourses = async (
    userId: string
): Promise<DashboardCourses> => {
    try {
        const purchasedCourses = await db.purchase.findMany({
            where: {
                userId,
            },
            select: {
                course: {
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true,
                            },
                        },
                    },
                },
            },
        });

        const courses = purchasedCourses.map(
            (purchase) => purchase.course
        ) as CourseWithProgress[];

        const progressList = await Promise.all(
            courses.map((course) => getProgress(userId, course.id))
        );

        const completedCourses: CourseWithProgress[] = [];
        const coursesInProgress: CourseWithProgress[] = [];

        courses.forEach((course, index) => {
            const progress = progressList[index];
            course.progress = progress;

            if (progress === 100) {
                completedCourses.push(course);
            } else {
                coursesInProgress.push(course);
            }
        });

        return {
            completedCourses,
            coursesInProgress,
        };
    } catch (error) {
        console.log("🚀 ~ getDashboardCourses ~ error:", error);
        return {
            completedCourses: [],
            coursesInProgress: [],
        };
    }
};
