"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Code, X } from "lucide-react";

import { LoadMoreButton } from "@/components/loade-more-button";
import { SnippetCard, SnippetCardSkeleton } from "./snippet-card";

import { useGetSnippets } from "../api/use-get-snippets";
import { useSearchSnippet } from "../hooks/use-search-snippet";

export const SnippetList = () => {
    const { searchQuery, setSearchQuery } = useSearchSnippet();

    const { isLoading, status, results, loadMore } = useGetSnippets({
        ...searchQuery,
    });

    useEffect(() => {
        if (status === "CanLoadMore" && !results.length) {
            loadMore(5);
        }
    }, [status, results.length, loadMore]);

    if (
        status === "LoadingFirstPage" ||
        (status === "LoadingMore" && !results.length)
    ) {
        return (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <SnippetCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map((snippet) => (
                    <SnippetCard key={snippet._id} snippet={snippet} />
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                <LoadMoreButton
                    isLoading={isLoading}
                    status={status}
                    onLoadMore={() => loadMore(5)}
                />
            </div>

            {status === "Exhausted" && !results.length && (
                <div className="mt-20 space-y-4 text-center">
                    <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 ring-1 ring-white/10">
                        <Code className="size-8 text-gray-400" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-xl font-medium">
                            No snippets found
                        </h3>
                        <p className="text-gray-400">
                            {searchQuery
                                ? "Try adjusting your search query or filters"
                                : "Be the first to share a code snippet with the community"}
                        </p>
                    </div>
                    {searchQuery && (
                        <Button
                            onClick={() =>
                                setSearchQuery({
                                    search: "",
                                    selectedLanguage: "",
                                })
                            }
                            variant="secondary"
                        >
                            <X />
                            Clear all filters
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};
