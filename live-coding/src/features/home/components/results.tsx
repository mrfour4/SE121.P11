import { Skeleton } from "@/components/ui/skeleton";
import { ResultCard, ResultCardSkeleton } from "./result-card";

import { getStreams } from "../service/get-streams";

export const Results = async () => {
    const data = await getStreams();

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">
                Streams we think you&apos;ll like
            </h2>
            {data.length === 0 && (
                <div className="text-sm text-muted-foreground">
                    No streams available
                </div>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {data.map((stream) => (
                    <ResultCard key={stream.id} data={stream} />
                ))}
            </div>
        </div>
    );
};

export const ResultsSkeleton = () => {
    return (
        <div>
            <Skeleton className="mb-4 h-8 w-[290px]" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {[...Array(4)].map((_, index) => (
                    <ResultCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};
