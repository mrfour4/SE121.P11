"use client";

import { useRef, useState, useTransition } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IngressInput } from "livekit-server-sdk";

import { createIngress } from "@/actions/ingress";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
    const [ingressType, setIngressType] = useState<IngressType>(RTMP);
    const [isPending, startTransition] = useTransition();

    const closeRef = useRef<HTMLButtonElement>(null);

    const onGenerate = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
                .then(() => {
                    toast.success("Connection generated");
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Failed to generate connection"));
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="primary">Generate connection</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate connection</DialogTitle>
                </DialogHeader>

                <Select
                    value={ingressType}
                    onValueChange={(value) => setIngressType(value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ingress Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMP}>RTMP</SelectItem>
                        <SelectItem value={WHIP}>WHIP</SelectItem>
                    </SelectContent>
                </Select>

                <Alert>
                    <AlertTriangle className="size-4" />
                    <AlertTitle>Warning!</AlertTitle>
                    <AlertDescription>
                        This action will reset all active streams using the
                        current connection.
                    </AlertDescription>
                </Alert>
                <div className="flex justify-between">
                    <DialogClose asChild ref={closeRef}>
                        <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="primary"
                        disabled={isPending}
                        onClick={onGenerate}
                    >
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
