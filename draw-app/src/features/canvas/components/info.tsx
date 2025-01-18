"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { Actions } from "@/components/actions";
import { Hint } from "@/components/hint";
import { TabSeparator } from "@/components/tab-separator";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

import { useGetBoard } from "@/features/boards/api/use-get-board";
import { useRenameModal } from "@/hooks/use-rename-modal";

type Props = {
    boardId: string;
};

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export const Info = ({ boardId }: Props) => {
    const { data, isPending } = useGetBoard(boardId);
    const { onOpen } = useRenameModal();

    if (isPending) {
        return <InfoSkeleton />;
    }

    return (
        <div className="absolute left-2 top-2 flex h-12 items-center rounded-md bg-white px-1.5 shadow-md">
            <Hint label="Go to board" side="bottom" sideOffset={10}>
                <Button variant="board" className="px-2" asChild>
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            height={24}
                            width={24}
                        />
                        <span
                            className={cn(
                                "text-xl font-semibold text-black",
                                poppins.className,
                            )}
                        >
                            Board
                        </span>
                    </Link>
                </Button>
            </Hint>

            <TabSeparator />
            <Hint label="Edit title" side="bottom" sideOffset={10}>
                <Button
                    variant="board"
                    className="px-2 text-base font-normal"
                    onClick={() => onOpen({ id: boardId, title: data?.title! })}
                >
                    {data?.title}
                </Button>
            </Hint>

            <TabSeparator />
            <Actions
                id={boardId}
                title={data?.title!}
                side="bottom"
                sideOffset={10}
            >
                <div>
                    <Hint label="Main menu" side="bottom" sideOffset={10}>
                        <Button size="icon" variant="board">
                            <Menu />
                        </Button>
                    </Hint>
                </div>
            </Actions>
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
