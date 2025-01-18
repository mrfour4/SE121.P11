"use client";

import { usePathname } from "next/navigation";

import { MobileSidebar } from "./mobile-sidebar";
import { UserButton } from "./user-button";

type Pathname = {
    title: string;
    description: string;
};

const pathnameMap: Record<string, Pathname> = {
    task: {
        title: "My Tasks",
        description: "View all of your tasks here",
    },
    projects: {
        title: "Projects",
        description: "View all of your projects here",
    },
};

const defaultMap = {
    title: "Home",
    description: "Monitor all of your projects and tasks here",
};

export const Navbar = () => {
    const pathname = usePathname();
    const pathnameKey = pathname.split("/")[3];

    const { title, description } = pathnameMap[pathnameKey] || defaultMap;

    return (
        <nav className="fixed left-0 right-0 top-0 z-20 flex items-center justify-between bg-white px-6 pb-1 pt-4 shadow-sm lg:left-[264px]">
            <div className="hidden flex-col lg:flex">
                <h1 className="text-2xl font-semibold">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            <MobileSidebar />
            <UserButton />
        </nav>
    );
};
