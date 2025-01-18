import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type Props = {
    description: string;
    value: string | number;
    label: string;
    color: string;
    gradient: string;
    icon: LucideIcon;
    metric: {
        label: string;
        value: string | number;
        icon: LucideIcon;
    };
};

export const StatCard = (stat: Props) => {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/40 to-black/20">
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-r opacity-10 transition-all duration-500",
                    stat.color,
                    stat.gradient,
                )}
            />

            <div className="relative p-6">
                <div className="mb-4 flex items-start justify-between">
                    <div>
                        <div className="mb-1 flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-400">
                                {stat.description}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-white">
                            {typeof stat.value === "number"
                                ? stat.value.toLocaleString()
                                : stat.value}
                        </h3>
                        <p className="mt-1 text-sm text-gray-400">
                            {stat.label}
                        </p>
                    </div>
                    <div
                        className={`rounded-xl bg-gradient-to-br p-3 ${stat.color} bg-opacity-10`}
                    >
                        <stat.icon className="size-5 text-white" />
                    </div>
                </div>

                <div className="flex items-center gap-2 border-t border-gray-800/50 pt-4">
                    <stat.metric.icon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-400">
                        {stat.metric.label}:
                    </span>
                    <span className="text-sm font-medium text-white">
                        {stat.metric.value}
                    </span>
                </div>
            </div>
        </div>
    );
};
