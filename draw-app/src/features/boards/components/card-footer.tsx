import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

type Props = {
    title: string;
    authorLabel: string;
    createdAtLabel: string;
    isFavorite: boolean;
    disabled: boolean;
    onClick: () => void;
};

export const CardFooter = ({
    title,
    authorLabel,
    createdAtLabel,
    isFavorite,
    disabled,
    onClick,
}: Props) => {
    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
    };
    return (
        <div className="relative bg-white p-3">
            <p className="max-w-[calc(100%-20px)] truncate text-sm">{title}</p>
            <p className="truncate text-xs text-muted-foreground opacity-50 transition-opacity group-hover:opacity-100">
                {authorLabel}, {createdAtLabel}
            </p>
            <button
                className={cn(
                    "absolute right-3 top-3 text-muted-foreground opacity-0 transition hover:text-blue-600 group-hover:opacity-100",
                    disabled && "cursor-not-allowed opacity-75",
                )}
                disabled={disabled}
                onClick={handleFavorite}
            >
                <Star
                    className={cn(
                        "size-4",
                        isFavorite && "fill-blue-600 text-blue-600",
                    )}
                />
            </button>
        </div>
    );
};
