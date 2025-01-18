import { CourseWithChapter } from "../types";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Menu } from "lucide-react";

import { CourseSidebar } from "./course-sidebar";

type Props = {
    course: CourseWithChapter;
    progressCount: number;
};

export const CourseMobileSidebar = ({ course, progressCount }: Props) => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white w-72">
                <VisuallyHidden>
                    <SheetHeader>
                        <SheetTitle>{course.title}</SheetTitle>
                        <SheetDescription>
                            {course.description}
                        </SheetDescription>
                    </SheetHeader>
                </VisuallyHidden>
                <CourseSidebar course={course} progressCount={progressCount} />
            </SheetContent>
        </Sheet>
    );
};
