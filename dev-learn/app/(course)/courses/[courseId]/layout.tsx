import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import { Confetti } from "@/components/confetti";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CourseNavbar } from "@/features/courses/components/course-navbar";
import { CourseSidebar } from "@/features/courses/components/course-sidebar";

import { getProgress } from "@/actions/get-progress";

type Props = {
    children: React.ReactNode;
    params: {
        courseId: string;
    };
};

const CourseLayout = async ({ params, children }: Props) => {
    const { userId } = auth();

    if (!userId) {
        redirect("/");
    }

    const { courseId } = params;

    const course = await db.course.findUnique({
        where: {
            id: courseId,
        },
        include: {
            chapters: {
                where: {
                    isPublished: true,
                },
                include: {
                    userProgress: {
                        where: {
                            userId,
                        },
                    },
                },
                orderBy: {
                    position: "asc",
                },
            },
        },
    });

    if (!course) {
        return redirect("/");
    }

    const progressCount = await getProgress(userId, courseId);

    return (
        <div className="h-full">
            <div className="h-20 w-full md:pl-80 fixed inset-y-0 z-50">
                <CourseNavbar course={course} progressCount={progressCount} />
            </div>

            <div className="hidden md:flex flex-col h-full w-80 fixed inset-y-0 z-50">
                <CourseSidebar course={course} progressCount={progressCount} />
            </div>

            <ScrollArea className="pt-20 md:pl-80 w-screen h-screen">
                <Confetti />
                {children}
            </ScrollArea>
        </div>
    );
};

export default CourseLayout;
