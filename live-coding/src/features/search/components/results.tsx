import { Skeleton } from "@/components/ui/skeleton";
import { ResultCard, ResultCardSkeleton } from "./result-card";

import { getSearch } from "../service/get-search";

type Props = {
    term?: string;
};

export const Results = async ({ term }: Props) => {
    const data = await getSearch(term);
    return (
        <div>
            <h2 className="mb-4 text-lg font-semibold">
                Result for term &quot;{term}&quot;
            </h2>
            {data.length === 0 && (
                <p className="text-sm text-muted-foreground">
                    No results found. Try searching for something else.
                </p>
            )}
            <div className="flex flex-col gap-y-4">
                {data.map((result) => (
                    <ResultCard key={result.id} data={result} />
                ))}
            </div>
        </div>
    );
};

export const ResultsSkeleton = () => {
    return (
        <div>
            <Skeleton className="mb-4 h-8 w-[290px]" />
            <div className="flex flex-col gap-y-4">
                {[...Array(4)].map((_, index) => (
                    <ResultCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};
