import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

import { format } from "date-fns";
import { NAVIGATE } from "../types";

type Props = {
    date: Date;
    onNavigate: (action: NAVIGATE) => void;
};

export const CalendarToolbar = ({ date, onNavigate }: Props) => {
    return (
        <div className="mb-4 flex w-full items-center justify-center gap-x-2 lg:w-auto lg:justify-start">
            <Button
                onClick={() => onNavigate(NAVIGATE.PREVIOUS)}
                variant="secondary"
                size="icon"
                className="flex items-center"
            >
                <ChevronLeft />
            </Button>

            <div className="flex h-8 w-full items-center justify-center rounded-md border border-input px-3 py-2 lg:w-auto">
                <CalendarIcon className="mr-2 size-4" />
                <p className="text-sm">{format(date, "MMMM yyyy")}</p>
            </div>

            <Button
                onClick={() => onNavigate(NAVIGATE.NEXT)}
                variant="secondary"
                size="icon"
                className="flex items-center"
            >
                <ChevronRight />
            </Button>
        </div>
    );
};
