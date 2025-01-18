import { Badge } from "@/components/ui/badge";
import { FilterSection } from "@/features/snippets/components/filter-section";
import { BookOpen } from "lucide-react";

export default function SnippetsPage() {
    return (
        <main className="mx-auto max-w-7xl px-4 py-12">
            <div className="mx-auto mb-16 max-w-3xl space-y-6 text-center">
                <Badge
                    variant="secondary"
                    className="rounded-full px-4 py-1.5 text-sm font-normal"
                >
                    <BookOpen className="size-4" />
                    Community Code Library
                </Badge>
                <h1 className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                    Discover & Share Code Snippets
                </h1>
                <p className="text-lg text-gray-400">
                    Explore a curated collection of code snippets from the
                    community
                </p>
            </div>

            <FilterSection />
        </main>
    );
}
