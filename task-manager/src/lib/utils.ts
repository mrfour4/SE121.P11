import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Charset, charset, generate } from "referral-codes";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const generateInvitedCode = () => {
    return generate({
        length: 6,
        charset: charset(Charset.ALPHANUMERIC),
    })[0];
};

export const snakeCaseToTitleCase = (str: string) => {
    return str
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
};
