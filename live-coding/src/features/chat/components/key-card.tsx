"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CopyButton } from "@/components/copy-button";

type Props = {
    value: string | null;
};

export const KeyCard = ({ value }: Props) => {
    const [show, setShow] = useState(false);

    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-center gap-x-10">
                <p className="shrink-0 font-semibold">Stream Key</p>
                <div className="w-full space-y-2">
                    <div className="flex w-full items-center gap-x-2">
                        <Input
                            value={value || ""}
                            type={show ? "text" : "password"}
                            readOnly
                            placeholder="Stream key"
                        />
                        <CopyButton value={value} />
                    </div>
                    <Button
                        size="sm"
                        variant="link"
                        onClick={() => setShow(!show)}
                    >
                        {show ? "Hide" : "Show"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
