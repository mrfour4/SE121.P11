import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Props = {
    value: number;
    variant?: "default" | "success";
    size?: "default" | "sm";
};

export const CourseProgress = ({
    value,
    variant = "default",
    size = "default",
}: Props) => {
    return (
        <div>
            <Progress className="h-2" value={value} variant={variant} />
            <p
                className={cn(
                    "mt-2 font-medium text-sky-700 text-sm",
                    variant === "success" && "text-emerald-700",
                    size === "sm" && "text-xs"
                )}
            >
                {Math.round(value)}% Completed
            </p>
        </div>
    );
};
