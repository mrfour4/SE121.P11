"use client";

import { useCopyToClipboard } from "@/hooks/use-copy-clipboard";
import { cn } from "@/lib/utils";
import { CheckCircle, Copy } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
    value?: string;
    className?: HTMLButtonElement["className"];
};

export const CopyButton = ({ value, className }: Props) => {
    const { isCopied, copyToClipboard } = useCopyToClipboard();

    return (
        <Button
            type="button"
            size="sm"
            variant="secondary"
            className={cn("text-xs font-normal", className)}
            onClick={() => copyToClipboard(value)}
        >
            {isCopied ? (
                <>
                    <CheckCircle className="!size-3.5" />
                    Copied!
                </>
            ) : (
                <>
                    <Copy className="!size-3.5" />
                    Copy
                </>
            )}
        </Button>
    );
};
