"use client";

import { useTransition } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";

import { updateStream } from "@/actions/stream";
import { toast } from "sonner";

type Field = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

type Props = {
    field: Field;
    label: string;
    value: boolean;
};

export const ToggleCard = ({ field, label, value }: Props) => {
    const [isPending, startTransition] = useTransition();

    const onChange = () => {
        startTransition(() => {
            updateStream({ [field]: !value }).catch((err) =>
                toast.error(err.message),
            );
        });
    };

    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-center justify-between">
                <p className="shrink-0 font-semibold">{label}</p>
                <div className="space-y-2">
                    <Switch
                        disabled={isPending}
                        checked={value}
                        onCheckedChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
};

export const ToggleCardSkeleton = () => {
    return <Skeleton className="w-full rounded-xl p-10" />;
};
