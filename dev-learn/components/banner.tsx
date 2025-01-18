import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

import { AlertTriangle, CheckCircle } from "lucide-react";

const bannerVariants = cva(
    "w-full p-4 flex items-center justify-center border text-sm text-center ",
    {
        variants: {
            variant: {
                warning: "bg-yellow-200/80 border-yellow-300 text-primary",
                success: "bg-emerald-700 border-emerald-800 text-secondary",
            },
        },
        defaultVariants: {
            variant: "warning",
        },
    }
);

const iconMap = {
    success: CheckCircle,
    warning: AlertTriangle,
};

interface Props extends VariantProps<typeof bannerVariants> {
    label: string;
}

export const Banner = ({ label, variant }: Props) => {
    const Icon = iconMap[variant || "warning"];
    return (
        <div className={cn(bannerVariants({ variant }))}>
            <Icon className="size-4 mr-2 flex-shrink-0" />
            {label}
        </div>
    );
};
