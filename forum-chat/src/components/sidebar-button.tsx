import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type Props = {
    Icon: LucideIcon;
    label: string;
    isActive?: boolean;
};

export const SidebarButton = ({ Icon, label, isActive }: Props) => {
    return (
        <div className="group flex cursor-pointer flex-col items-center justify-center gap-y-0.5">
            <Button
                variant="transparent"
                className={cn(
                    "size-9 p-2 group-hover:bg-accent/20",
                    isActive && "bg-accent/20",
                )}
            >
                <Icon className="size-4 text-white transition-all group-hover:scale-110" />
            </Button>
            <span className="text-xs text-white group-hover:text-accent">
                {label}
            </span>
        </div>
    );
};
