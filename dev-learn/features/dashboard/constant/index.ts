import { TRoute } from "../types";

import {
    AlarmClockCheck,
    BarChart,
    Compass,
    DraftingCompass,
    Layout,
    List,
    MessageCircleMore,
    SquareTerminal,
    VideoIcon,
} from "lucide-react";

export const guestRoutes: TRoute[] = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search",
    },
];

export const teacherRoutes: TRoute[] = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teacher/analytics",
    },
];

export const toolRoutes: TRoute[] = [
    {
        label: "Forum",
        href: process.env.NEXT_PUBLIC_FORUM_URL!,
        icon: MessageCircleMore,
    },
    {
        label: "Task Manager",
        href: process.env.NEXT_PUBLIC_TASK_MANAGER_URL!,
        icon: AlarmClockCheck,
    },
    {
        label: "Live Coding",
        href: process.env.NEXT_PUBLIC_LIVE_CODING_URL!,
        icon: VideoIcon,
    },
    {
        label: "Drawing App",
        href: process.env.NEXT_PUBLIC_DRAW_APP_URL!,
        icon: DraftingCompass,
    },
    {
        label: "Code Editor",
        href: process.env.NEXT_PUBLIC_EDITOR_URL!,
        icon: SquareTerminal,
    },
];
