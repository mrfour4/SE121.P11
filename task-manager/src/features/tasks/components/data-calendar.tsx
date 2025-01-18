"use client";

import "react-big-calendar/lib/css/react-big-calendar.css";

import { useState } from "react";

import { TaskExtend } from "@/types";
import { NAVIGATE } from "../types";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { CalendarToolbar } from "./calendar-toolbar";
import { EventCard } from "./event-card";

import { format, getDay, parse, startOfWeek, subMonths } from "date-fns";
import { enUS } from "date-fns/locale";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

type Props = {
    data: TaskExtend[];
};

export const DataCalendar = ({ data }: Props) => {
    const [value, setValue] = useState(
        data.length > 0 ? new Date(data[0].dueDate) : new Date(),
    );

    const events = data.map((task) => ({
        start: new Date(task.dueDate),
        end: new Date(task.dueDate),
        title: task.name,
        project: task.project,
        assignee: task.assignee,
        status: task.status,
        id: task.$id,
    }));

    const onNavigate = (action: NAVIGATE) => {
        switch (action) {
            case NAVIGATE.PREVIOUS: {
                setValue(subMonths(value, 1));
                break;
            }
            case NAVIGATE.NEXT: {
                setValue(subMonths(value, -1));
                break;
            }
            case NAVIGATE.TODAY: {
                setValue(new Date());
                break;
            }
        }
    };

    return (
        <Calendar
            localizer={localizer}
            date={value}
            events={events}
            views={["month"]}
            defaultView="month"
            toolbar
            showAllEvents
            className="h-full"
            max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
            formats={{
                weekdayFormat: (date, culture, localizer) =>
                    localizer?.format(date, "EEE", culture) ?? "",
            }}
            components={{
                eventWrapper: ({ event }) => (
                    <EventCard
                        id={event.id}
                        title={event.title}
                        assignee={event.assignee}
                        project={event.project}
                        status={event.status}
                    />
                ),

                toolbar: ({ date }) => (
                    <CalendarToolbar date={date} onNavigate={onNavigate} />
                ),
            }}
        />
    );
};
