import { cn } from "@/lib/utils";

type Props = {
    className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

export const LiveBadge = ({ className }: Props) => {
    return (
        <div
            className={cn(
                "rounded-md border border-background bg-rose-500 p-0.5 px-1.5 text-center text-[10px] font-semibold uppercase tracking-wide",
                className,
            )}
        >
            Live
        </div>
    );
};
