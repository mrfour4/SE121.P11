"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Hint } from "@/components/hint";
import { TabSeparator } from "@/components/tab-separator";

import { cn } from "@/lib/utils";
import { SwatchBook } from "lucide-react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

type Props = {
    boardId: string;
};

export const Info = ({ boardId }: Props) => {
    return (
        <div className="absolute bottom-1 right-1 z-[99] flex h-12 items-center rounded-md bg-white px-1.5 shadow-md">
            <Hint label="Go to board" side="top" sideOffset={10}>
                <Button
                    variant="board"
                    className="pointer-events-auto px-2 lg:px-3"
                    asChild
                >
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            height={24}
                            width={24}
                            className="size-5 lg:size-6"
                        />
                        <span
                            className={cn(
                                "text-base font-semibold text-black lg:text-xl",
                                poppins.className,
                            )}
                        >
                            Board
                        </span>
                    </Link>
                </Button>
            </Hint>
            <div className="hidden items-center lg:flex">
                <TabSeparator />
                <Hint label="Switch to basic mode" side="top" sideOffset={10}>
                    <Button
                        variant="board"
                        className="pointer-events-auto"
                        asChild
                    >
                        <Link href={`/board/${boardId}`}>
                            <SwatchBook />
                        </Link>
                    </Button>
                </Hint>
            </div>
        </div>
    );
};

export const InfoSkeleton = () => {
    return (
        <div className="absolute left-2 top-2 flex h-12 w-[300px] items-center rounded-md bg-white px-1.5 shadow-md">
            <Skeleton className="size-full" />
        </div>
    );
};
