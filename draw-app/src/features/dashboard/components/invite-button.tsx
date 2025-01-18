"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { OrganizationProfile } from "@clerk/nextjs";
import { Plus } from "lucide-react";

export const InviteButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus />
                    Invite members
                </Button>
            </DialogTrigger>
            <DialogContent className="w-auto max-w-[880px] border-none bg-transparent p-0">
                <OrganizationProfile routing="hash" />
            </DialogContent>
        </Dialog>
    );
};
