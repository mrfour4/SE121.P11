import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Charset, charset, generate } from "referral-codes";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const generateJoinCode = () => {
    return generate({
        length: 6,
        charset: charset(Charset.NUMBERS),
    })[0];
};

export const parsedName = (name: string) => {
    return name.replace(/\s+/g, "-").toLowerCase();
};

export const isEmptyText = (text: string) => {
    return text.replace(/<(.|\n)*?/g, "").trim().length === 0;
};
