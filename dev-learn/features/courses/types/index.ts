import { Chapter, Course, UserProgress } from "@prisma/client";

export type CourseWithChapter = Course & {
    chapters: (Chapter & {
        userProgress: UserProgress[] | null;
    })[];
};
