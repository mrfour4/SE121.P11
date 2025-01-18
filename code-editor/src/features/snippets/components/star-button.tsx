import { Id } from "../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

import { useGetStars } from "../api/use-get-starts";
import { useIsStarSnippet } from "../api/use-is-star";
import { useStarSnippet } from "../api/use-star-snippet";

type Props = {
    id: string;
};

export const StarButton = ({ id }: Props) => {
    const isStarred = useIsStarSnippet(id);
    const starSnippet = useStarSnippet();
    const startsCount = useGetStars(id);

    const onClick = () => {
        starSnippet.mutate({ id: id as Id<"snippets"> });
    };

    const isPending =
        isStarred.isPending || starSnippet.isPending || startsCount.isPending;
    return (
        <Button
            variant="secondary"
            className={cn(
                "h-7 w-auto gap-x-2 border-none bg-gray-500/10 px-2 text-xs font-semibold ring-0 hover:bg-yellow-500/20 hover:text-yellow-500",
                isStarred.data && "bg-yellow-500/20 text-yellow-500",
            )}
            disabled={isPending}
            onClick={onClick}
        >
            <Star
                className={cn(
                    "!size-3",
                    isStarred.data && "fill-yellow-500 stroke-yellow-500",
                )}
            />
            {startsCount.data}
        </Button>
    );
};
