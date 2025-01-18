"use client";

import { useState } from "react";

import { CheckCheck, Copy } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
    value?: string | null;
};

export const CopyButton = ({ value }: Props) => {
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        if (!value) return;

        setCopied(true);

        navigator.clipboard.writeText(value);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    const Icon = copied ? CheckCheck : Copy;

    return (
        <Button
            variant="ghost"
            size="sm"
            disabled={!value || copied}
            onClick={onCopy}
        >
            <Icon />
        </Button>
    );
};
