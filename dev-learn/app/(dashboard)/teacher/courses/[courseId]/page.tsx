import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import {
    CircleDollarSign,
    FileIcon,
    LayoutDashboard,
    ListCheck,
} from "lucide-react";

import { Banner } from "@/components/banner";
import { IconBadge } from "@/components/icon-badge";

import { AttachmentForm } from "@/features/teacher/course/components/attachment-form";
import { CategoryForm } from "@/features/teacher/course/components/category-form";
import { ChaptersForm } from "@/features/teacher/course/components/chapters-form";
import { CourseActions } from "@/features/teacher/course/components/course-actions";
import { DescriptionForm } from "@/features/teacher/course/components/description-form";
import { ImageForm } from "@/features/teacher/course/components/image-form";
import { PriceForm } from "@/features/teacher/course/components/price-form";
import { TitleForm } from "@/features/teacher/course/components/title-form";

type Props = {
    params: { courseId: string };
};

const CoursePage = async ({ params }: Props) => {
    const { courseId } = params;

    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: courseId,
            userId,
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc",
                },
            },
            attachments: {
                orderBy: [
                    {
                        updateAt: "desc",
                    },
                    {
                        createAt: "desc",
                    },
                ],
            },
        },
    });

    if (!course) {
        return redirect("/");
    }

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    });

    const categoryOptions = categories.map((category) => ({
        label: category.name,
        value: category.id,
    }));

    const { title, description, imageUrl, price, categoryId, chapters } =
        course;
    const hasPublishChapter = chapters.some((chapter) => chapter.isPublished);

    const requiredFields = [
        title,
        description,
        imageUrl,
        categoryId,
        hasPublishChapter,
    ];
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    return (
        <>
            {!course.isPublished && (
                <Banner label="This course is unpublished. It will not be visible to students" />
            )}
            <div className="p-6 relative">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium">Course setup</h1>
                        <span className="text-sm text-slate-700">
                            Complete all fields ({completedFields}/{totalFields}
                            )
                        </span>
                    </div>

                    <CourseActions
                        courseId={courseId}
                        disabled={completedFields !== totalFields}
                        isPublished={course.isPublished}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard} />
                            <h2 className="text-xl">Customize your course</h2>
                        </div>

                        <TitleForm initialData={course} courseId={course.id} />
                        <DescriptionForm
                            initialData={course}
                            courseId={course.id}
                        />
                        <ImageForm initialData={course} courseId={course.id} />
                        <CategoryForm
                            initialData={course}
                            courseId={course.id}
                            options={categoryOptions}
                        />
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={ListCheck} />
                                <h2 className="text-xl">Course chapters</h2>
                            </div>

                            <ChaptersForm
                                initialData={course}
                                courseId={course.id}
                            />
                        </div>

                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={CircleDollarSign} />
                                <h2 className="text-xl">Sell your course</h2>
                            </div>

                            <PriceForm
                                initialData={course}
                                courseId={course.id}
                            />
                        </div>

                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={FileIcon} />
                                <h2 className="text-xl">
                                    Resources & Attachments
                                </h2>
                            </div>

                            <AttachmentForm
                                initialData={course}
                                courseId={course.id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CoursePage;
