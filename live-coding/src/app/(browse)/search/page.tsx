import { Results, ResultsSkeleton } from "@/features/search/components/results";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
    searchParams: {
        term?: string;
    };
};

export default function SearchPage({ searchParams }: Props) {
    const { term } = searchParams;

    if (!term) {
        redirect("/");
    }
    return (
        <div className="mx-auto h-full max-w-screen-2xl p-8">
            <Suspense fallback={<ResultsSkeleton />}>
                <Results term={term} />
            </Suspense>
        </div>
    );
}
