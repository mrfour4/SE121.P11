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
    BookOpen,
    DraftingCompass,
    ListCollapse,
    MessageCircleMore,
    SquareArrowOutUpRight,
    SquareTerminal,
    VideoIcon,
} from "lucide-react";

export const Tools = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center gap-2.5 rounded-md p-2.5 font-medium text-neutral-500 transition hover:bg-white hover:text-primary data-[state=open]:bg-white">
                <div className="flex items-center gap-2.5">
                    <ListCollapse className="size-5 text-neutral-500" />
                    More
                </div>
                <SquareArrowOutUpRight className="ml-auto size-4 text-neutral-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="right"
                sideOffset={10}
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
                    <Link href={process.env.NEXT_PUBLIC_LIVE_CODING_URL!}>
                        <VideoIcon />
                        Live Coding
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2.5" asChild>
                    <Link href={process.env.NEXT_PUBLIC_DRAW_APP_URL!}>
                        <DraftingCompass />
                        Drawing App
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
