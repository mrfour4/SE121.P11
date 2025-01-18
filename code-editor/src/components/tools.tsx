import { TOOLS } from "@/features/dashboard/constants";

import Link from "next/link";

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

import { ChevronsUpDown, ListCollapse } from "lucide-react";

export const Tools = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className="group w-full justify-start border-gray-800/50 bg-[#1e1e2e]/80 hover:border-gray-700 hover:bg-[#262637] sm:w-40"
                >
                    <ListCollapse className="text-gray-400 group-hover:text-gray-300" />
                    <span className="text-gray-300 group-hover:text-white">
                        More
                    </span>
                    <ChevronsUpDown className="ml-auto shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0" align="start">
                <Command className="bg-[#1e1e2e]/95">
                    <CommandList>
                        <CommandGroup heading="Select Tools">
                            {TOOLS.map((item) => (
                                <CommandItem key={item.label} asChild>
                                    <Link
                                        href={item.href}
                                        className="group cursor-pointer border-2 border-transparent text-gray-300 data-[selected=true]:bg-blue-500/20"
                                    >
                                        <div className="flex size-8 items-center justify-center rounded-lg bg-gray-800/50 text-gray-400 transition-all duration-200 group-hover:scale-110 group-hover:text-blue-400">
                                            <item.icon className="size-4" />
                                        </div>
                                        <span className="group-hover:text-blue-400">
                                            {item.label}
                                        </span>
                                    </Link>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
