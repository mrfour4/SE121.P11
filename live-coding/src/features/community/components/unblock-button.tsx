"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { handleUnblock } from "@/actions/block";
import { toast } from "sonner";

type Props = {
    userId: string;
};

export const UnblockButton = ({ userId }: Props) => {
    const [isPending, startTransaction] = useTransition();

    const onClick = () => {
        startTransaction(() => {
            handleUnblock(userId)
                .then((result) => {
                    toast.success(`Unblocked ${result.blocked.username}`);
                })
                .catch((error) => {
                    toast.error("Something went wrong");
                });
        });
    };
    return (
        <Button
            size="sm"
            variant="link"
            className="w-full text-blue-500"
            disabled={isPending}
            onClick={onClick}
        >
            Unblock
        </Button>
    );
};
