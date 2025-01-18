"use client";

import { Theme } from "@/types";
import { THEMES } from "../constants";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { ChevronsUpDown, Palette } from "lucide-react";

import { useEditor } from "@/hooks/use-editor";

export const ThemeSelector = () => {
    const [open, setOpen] = useState(false);

    const {
        config: { theme: value },
        setConfig,
    } = useEditor();

    const onSelect = (value: string) => {
        setConfig({ theme: value as Theme });
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="group w-full justify-start border-gray-800/50 bg-[#1e1e2e]/80 hover:border-gray-700 hover:bg-[#262637] sm:w-40"
                >
                    <Palette className="text-gray-400 group-hover:text-gray-300" />
                    <span className="text-gray-300 group-hover:text-white">
                        {value
                            ? THEMES.find((item) => item.value === value)?.label
                            : "Select item..."}
                    </span>

                    <ChevronsUpDown className="ml-auto shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0" align="start">
                <Command className="bg-[#1e1e2e]/95">
                    <CommandList>
                        <CommandGroup heading="Select Theme">
                            {THEMES.map((item) => {
                                const isActive = value === item.value;

                                return (
                                    <CommandItem
                                        key={item.label}
                                        className={cn(
                                            "group border-2 border-transparent text-gray-300 data-[selected=true]:bg-blue-500/20",
                                            isActive &&
                                                "border-blue-500/30 bg-blue-500/10 text-blue-400",
                                        )}
                                        value={item.value}
                                        onSelect={onSelect}
                                    >
                                        <div
                                            className={cn(
                                                "flex size-8 items-center justify-center rounded-lg bg-gray-800/50 text-gray-400 transition-all duration-200 group-hover:scale-110",
                                                isActive &&
                                                    "bg-blue-500/10 text-blue-400",
                                            )}
                                        >
                                            <item.icon className="size-4" />
                                        </div>
                                        <span>{item.label}</span>

                                        <div
                                            className="ml-auto size-4 rounded-full border border-gray-600"
                                            style={{ background: item.color }}
                                        />
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
