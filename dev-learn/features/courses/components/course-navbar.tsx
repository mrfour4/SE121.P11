import { CourseWithChapter } from "../types";

import { NavbarRoutes } from "@/components/navbar-routes";
import { CourseMobileSidebar } from "./mobile-sidebar";

type Props = {
    course: CourseWithChapter;
    progressCount: number;
};

export const CourseNavbar = ({ course, progressCount }: Props) => {
    return (
        <div className="p-4 h-full flex items-center bg-white border-b shadow-sm">
            <CourseMobileSidebar
                course={course}
                progressCount={progressCount}
            />
            <NavbarRoutes />
        </div>
    );
};
