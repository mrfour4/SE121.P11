"use client";

import { useState } from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ResponsiveModal } from "@/components/responsive-modal";

type State = {
    resolve: (value: boolean) => void;
} | null;

type Props = {
    title: string;
    message: string;
    variant?: ButtonProps["variant"];
};
export const useConfirm = ({
    title,
    message,
    variant = "destructive",
}: Props) => {
    const [promised, setPromised] = useState<State>(null);

    const confirm = () =>
        new Promise<boolean>((resolve) => {
            setPromised({ resolve });
        });

    const onClose = () => {
        setPromised(null);
    };

    const onConfirm = () => {
        promised?.resolve(true);
        onClose();
    };

    const onCancel = () => {
        promised?.resolve(false);
        onClose();
    };

    const ConfirmDialog = () => (
        <ResponsiveModal open={promised !== null} onOpenChange={onClose}>
            <Card className="size-full border-none shadow-none">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{message}</CardDescription>
                </CardHeader>

                <CardFooter className="pt-8">
                    <div className="flex w-full flex-col items-center justify-end gap-x-2 gap-y-2 pt-4 lg:flex-row">
                        <Button
                            variant="outline"
                            className="w-full lg:w-auto"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant={variant}
                            onClick={onConfirm}
                            className="w-full lg:w-auto"
                        >
                            Confirm
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </ResponsiveModal>
    );

    return { confirm, ConfirmDialog };
};
