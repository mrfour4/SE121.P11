"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
    courseId: string;
    id: string;
    label: string;
    isCompleted: boolean;
    isLocked: boolean;
};

export const ChapterSidebar = ({
    courseId,
    id,
    label,
    isCompleted,
    isLocked,
}: Props) => {
    const pathname = usePathname();

    const Icon = isLocked ? Lock : isCompleted ? CheckCircle : PlayCircle;
    const isActive = pathname.includes(id);

    return (
        <Link
            href={`/courses/${courseId}/chapters/${id}`}
            className={cn(
                "pl-6 flex items-center gap-x-2 text-slate-500 text-sm font-medium transition-all hover:text-slate-600 hover:bg-slate-300/20",
                isActive &&
                    "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
                isCompleted && "text-emerald-700 hover:text-emerald-700",
                isCompleted && isActive && "bg-emerald-200/20"
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    className={cn(
                        "size-5 text-slate-500",
                        isActive && "text-slate-700",
                        isCompleted && "text-emerald-700"
                    )}
                />
                {label}
            </div>

            <div
                className={cn(
                    "ml-auto opacity-0 border-2 border-slate-700 h-[52px] transition-all",
                    isActive && "opacity-100",
                    isCompleted && "border-emerald-700"
                )}
            ></div>
        </Link>
    );
};
