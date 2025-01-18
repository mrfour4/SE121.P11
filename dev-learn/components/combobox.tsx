"use client";

import { forwardRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

import { useMediaQuery } from "@/hooks/use-media-query";

type Option = {
    label: string;
    value: string;
};

interface ComboboxTriggerProps
    extends React.ComponentPropsWithoutRef<typeof Button> {
    open: boolean;
    options: Option[];
    value: string;
}

const ComboboxTrigger = forwardRef<HTMLButtonElement, ComboboxTriggerProps>(
    ({ open, options, value, ...props }, ref) => (
        <Button
            ref={ref}
            {...props}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
        >
            {value
                ? options.find((option) => option.value === value)?.label
                : "Select option..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
    )
);

ComboboxTrigger.displayName = "ComboboxTrigger";

type ComboboxProps = {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
};

interface ComboboxContentProps extends ComboboxProps {
    setOpen: (open: boolean) => void;
}

const ComboboxContent = ({
    options,
    value,
    onChange,
    setOpen,
}: ComboboxContentProps) => {
    return (
        <Command
            loop
            filter={(_, search, keywords) => {
                const isMatched = keywords
                    ?.join(" ")
                    .toLowerCase()
                    .includes(search.toLowerCase());
                if (isMatched) return 1;
                return 0;
            }}
        >
            <CommandInput placeholder="Search option..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {options.map((option) => (
                        <CommandItem
                            key={option.value}
                            value={option.value}
                            keywords={[option.label]}
                            onSelect={(currentValue) => {
                                onChange(
                                    currentValue === value ? "" : currentValue
                                );
                                setOpen(false);
                            }}
                        >
                            <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    value === option.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                )}
                            />
                            {option.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
};

export const Combobox = ({ options, value, onChange }: ComboboxProps) => {
    const [open, setOpen] = useState(false);

    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <ComboboxTrigger
                        open={open}
                        options={options}
                        value={value}
                    />
                </PopoverTrigger>
                <PopoverContent className="p-0 max-w-80" align="start">
                    <ComboboxContent
                        options={options}
                        value={value}
                        onChange={onChange}
                        setOpen={setOpen}
                    />
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <ComboboxTrigger open={open} options={options} value={value} />
            </DrawerTrigger>
            <DrawerContent>
                <VisuallyHidden asChild>
                    <DrawerHeader>
                        <DrawerTitle>Combobox options</DrawerTitle>
                        <DrawerDescription>Select an option</DrawerDescription>
                    </DrawerHeader>
                </VisuallyHidden>

                <ComboboxContent
                    options={options}
                    value={value}
                    onChange={onChange}
                    setOpen={setOpen}
                />
            </DrawerContent>
        </Drawer>
    );
};
