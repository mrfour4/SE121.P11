import { cn } from "@/lib/utils";
import { ChevronRight, Loader } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
    isLoading: boolean;
    status: "LoadingFirstPage" | "CanLoadMore" | "LoadingMore" | "Exhausted";
    onLoadMore: () => void;
};

export const LoadMoreButton = ({ isLoading, status, onLoadMore }: Props) => {
    return (
        <Button
            className={cn(
                "hover:text-blue-400",
                status === "Exhausted" && "hidden",
            )}
            size="lg"
            variant="secondary"
            onClick={onLoadMore}
            disabled={isLoading}
        >
            {status === "LoadingMore" ? (
                <>
                    Loading...
                    <Loader className="animate-spin" />
                </>
            ) : (
                <>
                    Load More
                    <ChevronRight />
                </>
            )}
        </Button>
    );
};
