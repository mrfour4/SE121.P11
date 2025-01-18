import { useState } from "react";

type Props = {
    timeout?: number;
    onCopy?: () => void;
};

export const useCopyToClipboard = ({ timeout = 2000, onCopy }: Props = {}) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = (value: string) => {
        if (typeof window === "undefined" || !navigator.clipboard.writeText) {
            return;
        }

        if (!value) return;

        navigator.clipboard.writeText(value).then(() => {
            setIsCopied(true);

            if (onCopy) {
                onCopy();
            }

            setTimeout(() => {
                setIsCopied(false);
            }, timeout);
        }, console.error);
    };

    return { isCopied, copyToClipboard };
};
