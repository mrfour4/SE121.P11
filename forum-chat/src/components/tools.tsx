import Link from "next/link";

import { Button } from "@/components/ui/button";
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
    DraftingCompass,
    MoreHorizontal,
    SquareTerminal,
    VideoIcon,
} from "lucide-react";

export const Tools = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="group flex cursor-pointer flex-col items-center justify-center gap-y-0.5">
                <Button
                    variant="transparent"
                    className="size-9 p-2 group-hover:bg-accent/20 group-data-[state=open]:bg-accent/20"
                >
                    <MoreHorizontal className="text-white transition-all group-hover:scale-110" />
                </Button>
                <span className="text-xs text-white group-hover:text-accent">
                    More
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="right"
                sideOffset={20}
                align="start"
                className="w-48"
            >
                <DropdownMenuLabel>Tools</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={process.env.NEXT_PUBLIC_COURSE_URL!}>
                        <BookOpen />
                        Course
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={process.env.NEXT_PUBLIC_TASK_MANAGER_URL!}>
                        <AlarmClockCheck />
                        Task Manager
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={process.env.NEXT_PUBLIC_LIVE_CODING_URL!}>
                        <VideoIcon />
                        Live Coding
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={process.env.NEXT_PUBLIC_DRAW_APP_URL!}>
                        <DraftingCompass />
                        Drawing App
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={process.env.NEXT_PUBLIC_EDITOR_URL!}>
                        <SquareTerminal />
                        Code Editor
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
