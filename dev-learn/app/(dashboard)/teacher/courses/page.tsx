import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import { DataTable } from "@/components/data-table";

import { columns } from "@/features/teacher/course-list/components/columns";
import { TableToolbar } from "@/features/teacher/course-list/components/table-toolbar";

const CoursesPage = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect("/");
    }

    const courses = await db.course.findMany({
        where: {
            userId,
        },
        orderBy: [
            {
                updateAt: "desc",
            },
            {
                createAt: "desc",
            },
        ],
    });

    return (
        <div className="p-6">
            <DataTable
                columns={columns}
                data={courses}
                toolbar={TableToolbar}
            />
        </div>
    );
};

export default CoursesPage;
