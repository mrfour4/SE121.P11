"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const progressVariants = cva("h-full w-full flex-1 bg-primary transition-all", {
    variants: {
        variant: {
            default: "bg-sky-600",
            success: "bg-emerald-700",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

export interface ProgressProps
    extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
        VariantProps<typeof progressVariants> {}

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    ProgressProps
>(({ className, value, variant, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn(
            "relative h-2 w-full overflow-hidden rounded-full bg-sky-600/20",
            className
        )}
        {...props}
    >
        <ProgressPrimitive.Indicator
            className={cn(progressVariants({ variant }))}
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
