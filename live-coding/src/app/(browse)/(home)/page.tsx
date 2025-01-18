import { Suspense } from "react";

import { Results, ResultsSkeleton } from "@/features/home/components/results";

export default function HomePage() {
    return (
        <div className="mx-auto h-full max-w-screen-2xl p-8">
            <Suspense fallback={<ResultsSkeleton />}>
                <Results />
            </Suspense>
        </div>
    );
}
