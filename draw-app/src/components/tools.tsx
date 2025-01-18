import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    AlarmClockCheck,
    BookOpen,
    MessageCircleMore,
    MoreHorizontal,
    SquareTerminal,
    VideoIcon,
} from "lucide-react";
import { Hint } from "./hint";

export const Tools = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="mt-auto">
                <div className="aspect-square">
                    <Hint
                        label="More tools"
                        side="right"
                        align="start"
                        sideOffset={18}
                    >
                        <button className="flex size-full items-center justify-center rounded-md bg-white/25 opacity-60 transition hover:opacity-100">
                            <MoreHorizontal className="text-white" />
                        </button>
                    </Hint>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="right"
                sideOffset={18}
                align="end"
                className="w-48"
            >
                <DropdownMenuLabel>Tools</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-2.5" asChild>
                    <Link href={process.env.NEXT_PUBLIC_COURSE_URL!}>
                        <BookOpen />
                        Course
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2.5" asChild>
                    <Link href={process.env.NEXT_PUBLIC_FORUM_URL!}>
                        <MessageCircleMore />
                        Forum
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2.5" asChild>
                    <Link href={process.env.NEXT_PUBLIC_TASK_MANAGER_URL!}>
                        <AlarmClockCheck />
                        Task Manager
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2.5" asChild>
                    <Link href={process.env.NEXT_PUBLIC_LIVE_CODING_URL!}>
                        <VideoIcon />
                        Live Coding
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2.5" asChild>
                    <Link href={process.env.NEXT_PUBLIC_EDITOR_URL!}>
                        <SquareTerminal />
                        Code Editor
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
