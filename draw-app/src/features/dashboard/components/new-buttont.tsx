"use client";

import { Hint } from "@/components/hint";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";

export const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <Hint
                        label="Create organization"
                        side="right"
                        align="start"
                        sideOffset={18}
                    >
                        <button className="flex size-full items-center justify-center rounded-md bg-white/25 opacity-60 transition hover:opacity-100">
                            <Plus className="text-white" />
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className="w-auto border-none bg-transparent p-0">
                <CreateOrganization hideSlug />
            </DialogContent>
        </Dialog>
    );
};
