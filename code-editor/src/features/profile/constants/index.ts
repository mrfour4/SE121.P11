import { ListVideo, LucideIcon, Star } from "lucide-react";

export type Tab = {
    label: string;
    value: "executions" | "starred";
    icon: LucideIcon;
};

export const TABS: Tab[] = [
    {
        label: "Code Executions",
        value: "executions",
        icon: ListVideo,
    },
    {
        label: "Starred Snippets",
        value: "starred",
        icon: Star,
    },
];
