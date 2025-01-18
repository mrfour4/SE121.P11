"use client";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { Emoji } from "@/types";
import { useState } from "react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
    hint?: string;
    children: React.ReactNode;
    onEmojiSelected: (value: string) => void;
};

export const EmojiPopover = ({
    hint = "Emoji",
    children,
    onEmojiSelected,
}: Props) => {
    const [openTooltip, setOpenTooltip] = useState(false);
    const [openPopover, setOpenPopover] = useState(false);

    const onSelect = (e: Emoji) => {
        onEmojiSelected(e.native);

        setOpenPopover(false);
        setTimeout(() => {
            setOpenTooltip(false);
        }, 500);
    };

    return (
        <TooltipProvider>
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <Tooltip
                    delayDuration={50}
                    open={openTooltip}
                    onOpenChange={setOpenTooltip}
                >
                    <TooltipTrigger asChild>
                        <PopoverTrigger asChild>{children}</PopoverTrigger>
                    </TooltipTrigger>

                    <TooltipContent className="border border-white/5 bg-black text-white">
                        <p className="text-xs font-medium">{hint}</p>
                    </TooltipContent>
                </Tooltip>

                <PopoverContent
                    className="w-full border-none p-0"
                    align="start"
                >
                    <Picker
                        theme="light"
                        data={data}
                        onEmojiSelect={onSelect}
                    />
                </PopoverContent>
            </Popover>
        </TooltipProvider>
    );
};
