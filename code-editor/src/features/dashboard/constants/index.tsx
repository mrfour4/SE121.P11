import { Language, Theme } from "@/types";

import {
    AlarmClockCheck,
    BookOpen,
    CloudMoon,
    DraftingCompass,
    Eclipse,
    Github,
    Glasses,
    LucideIcon,
    MessageCircleMore,
    Moon,
    Users,
    VideoIcon,
} from "lucide-react";

type ThemeItem = {
    label: string;
    value: Theme;
    icon: LucideIcon;
    color: string;
};

export const THEMES: ThemeItem[] = [
    {
        label: "Dark",
        value: Theme.Default,
        icon: Moon,
        color: "#1e1e1e",
    },
    {
        label: "Dracula",
        value: Theme.Dracula,
        icon: Glasses,
        color: "#282a36",
    },
    {
        label: "Night Owl",
        value: Theme.NightOwl,
        icon: CloudMoon,
        color: "#011627",
    },
    {
        label: "Github",
        value: Theme.Github,
        icon: Github,
        color: "#24292e",
    },
    {
        label: "Cobalt",
        value: Theme.Cobalt,
        icon: Eclipse,
        color: "#002240",
    },
];

type LanguageConfig = {
    label: string;
    value: Language;
    logo: string;
};

export const LANGUAGES: Record<Language, LanguageConfig> = {
    javascript: {
        label: "JavaScript",
        value: Language.JavaScript,
        logo: "/languages/javascript.svg",
    },
    typescript: {
        label: "TypeScript",
        value: Language.TypeScript,
        logo: "/languages/typescript.svg",
    },
    python: {
        label: "Python",
        value: Language.Python,
        logo: "/languages/python.svg",
    },
    java: {
        label: "Java",
        value: Language.Java,
        logo: "/languages/java.svg",
    },
    cpp: {
        label: "C++",
        value: Language.Cpp,
        logo: "/languages/cpp.svg",
    },
    csharp: {
        label: "C#",
        value: Language.CSharp,
        logo: "/languages/csharp.svg",
    },
};

export type ToolItem = {
    icon: LucideIcon;
    label: string;
    href: string;
};

export const TOOLS: ToolItem[] = [
    {
        label: "Course",
        href: process.env.NEXT_PUBLIC_COURSE_URL!,
        icon: BookOpen,
    },
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
];

export const TOOLS_MOBILE: ToolItem[] = [
    { href: "/snippets", label: "Community", icon: Users },
    ...TOOLS,
];

export const DRAFT_CODE_KEY = "editor-draft";
