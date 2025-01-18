import { differenceInHours, format, formatDistanceToNow } from "date-fns";

export function formatDateTime(date: number) {
    const now = new Date();
    if (differenceInHours(now, date) < 24) {
        return formatDistanceToNow(date, { addSuffix: true });
    }
    return format(date, "MMM dd, yyyy");
}
