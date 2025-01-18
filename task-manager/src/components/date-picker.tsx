"use client";

import { ClassName } from "@/types";

import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { format } from "date-fns";

type Props = {
    value?: Date;
    onChange: (date: Date) => void;
    className?: ClassName;
    placeholder?: string;
};

export const DatePicker = ({
    value,
    onChange,
    className,
    placeholder,
}: Props) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="lg"
                    className={cn(
                        "w-full justify-start px-3 text-left font-normal",
                        !value && "text-muted-foreground",
                        className,
                    )}
                >
                    <CalendarIcon />
                    {value ? format(value, "PPP") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    initialFocus
                    mode="single"
                    selected={value}
                    onSelect={(date) => onChange(date as Date)}
                />
            </PopoverContent>
        </Popover>
    );
};
