import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
    course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
    const grouped: {
        [courseTitle: string]: number;
    } = {};

    purchases.map((purchase) => {
        const courseTitle = purchase.course.title;

        if (!grouped[courseTitle]) {
            grouped[courseTitle] = 0;
        }

        grouped[courseTitle] += purchase.course.price!;
    });

    return grouped;
};

export const getAnalytics = async (userId: string) => {
    try {
        const purchases = await db.purchase.findMany({
            where: {
                course: {
                    userId,
                },
            },
            include: {
                course: true,
            },
        });
        const groupedEarning = groupByCourse(purchases);
        const data = Object.entries(groupedEarning).map(
            ([courseTitle, total]) => ({
                name: courseTitle,
                total,
            })
        );

        const totalSales = purchases.length;
        const totalRevenues = data.reduce((acc, item) => acc + item.total, 0);

        return {
            data,
            totalSales,
            totalRevenues,
        };
    } catch (error) {
        console.log("🚀 ~ getAnalytics ~ error:", error);
        return {
            data: [],
            totalSales: 0,
            totalRevenues: 0,
        };
    }
};
