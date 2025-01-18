import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

import { LucideIcon } from "lucide-react";

const bgVariants = cva("rounded-full flex items-center justify-center", {
    variants: {
        variant: {
            default: "bg-sky-100",
            success: "bg-emerald-100",
        },
        size: {
            default: "p-2",
            sm: "p-1",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

const iconVariants = cva("", {
    variants: {
        variant: {
            default: "text-sky-700",
            success: "text-emerald-700",
        },
        size: {
            default: "size-8",
            sm: "size-4",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

type bgVariantsProps = VariantProps<typeof bgVariants>;
type iconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends bgVariantsProps, iconVariantsProps {
    icon: LucideIcon;
}

export const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
    return (
        <div className={cn(bgVariants({ variant, size }))}>
            <Icon className={cn(iconVariants({ variant, size }))} />
        </div>
    );
};
