import { toolRoutes } from "@/features/dashboard/constant";

import Link from "next/link";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
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
    DraftingCompass,
    ListCollapse,
    MessageCircleMore,
    SquareTerminal,
    VideoIcon,
} from "lucide-react";

import { SidebarItem } from "@/features/dashboard/components/sidebar-item";

export const Tools = () => {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="hidden md:flex items-center gap-x-2 pl-6 transition-all text-slate-500 text-sm font-medium hover:text-slate-600 hover:bg-slate-300/70 group data-[state=open]:bg-sky-200/20">
                    <div className="flex items-center gap-x-2 py-4 group-data-[state=open]:text-sky-700">
                        <ListCollapse className="size-5 " />
                        <span>More</span>
                    </div>

                    <div className="ml-auto opacity-0 border-2 border-sky-700 h-full transition-all group-data-[state=open]:opacity-100" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="right"
                    align="start"
                    className="w-48"
                >
                    <DropdownMenuLabel>Tools</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href={process.env.NEXT_PUBLIC_FORUM_URL!}>
                            <MessageCircleMore />
                            Forum
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

            <MobileTools />
        </>
    );
};

export const MobileTools = () => {
    return (
        <Accordion className="md:hidden" type="single" collapsible>
            <AccordionItem value="tools">
                <AccordionTrigger className="hover:text-slate-600 hover:bg-slate-300/70 pr-6">
                    <div className="w-full flex items-center gap-x-2 pl-6 transition-all text-slate-500 text-sm font-medium ">
                        <ListCollapse className="size-5 " />
                        <span>More</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    {toolRoutes.map((route) => (
                        <SidebarItem
                            key={route.href}
                            href={route.href}
                            label={route.label}
                            icon={route.icon}
                        />
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
