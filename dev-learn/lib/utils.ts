import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function moveElement<T>(arr: T[], from: number, to: number) {
    const newArr = [...arr];
    const element = newArr.splice(from, 1)[0];
    newArr.splice(to, 0, element);

    return newArr;
}

export function isEmptyText(text: string) {
    const strippedMessage = text
        .replace(/<[^>]*>/g, "") // remove HTML tags
        .replace(/&nbsp;/g, "") // remove non-breaking spaces
        .trim(); // remove leading/trailing spaces

    // Check if the message is empty or only contains invisible characters
    return strippedMessage.length === 0;
}
