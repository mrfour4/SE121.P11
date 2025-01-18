"use client";

import { LANGUAGES } from "@/features/dashboard/constants";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { Search, Tag, X } from "lucide-react";
import { SnippetList } from "./snippet-list";

import { useDebouncedCallback } from "use-debounce";
import { useSearchSnippet } from "../hooks/use-search-snippet";

export const FilterSection = () => {
    const tags = useMemo(
        () =>
            Object.values(LANGUAGES).map((lang) => ({
                label: lang.label,
                value: lang.value,
            })),
        [],
    );

    const {
        searchQuery: { selectedLanguage, search },
        setSearchQuery,
    } = useSearchSnippet();

    const [value, setValue] = useState("");
    const debouncedSearch = useDebouncedCallback(setSearchQuery, 500);

    return (
        <div>
            <div className="mx-auto mb-12 max-w-5xl space-y-6">
                <div className="group relative">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />
                    <div className="relative flex items-center">
                        <Search className="absolute left-4 size-5 text-gray-400" />
                        <Input
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                debouncedSearch({ search: e.target.value });
                            }}
                            placeholder="Search snippets by title, language, or author..."
                            className="h-auto rounded-xl border border-[#313244] bg-[#1e1e2e]/80 py-4 pl-12 pr-4 text-white transition-all duration-200 placeholder:text-gray-500 hover:border-[#414155] hover:bg-[#1e1e2e] focus:outline-none focus:ring-2 focus:ring-blue-500/50 md:text-base"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Badge
                        variant="secondary"
                        className="mr-4 rounded-lg px-4 py-2 ring-1 ring-gray-800"
                    >
                        <Tag className="size-4 text-gray-400" />
                        <span className="text-sm text-gray-400">
                            Languages:
                        </span>
                    </Badge>
                    {tags.map(({ label, value }) => (
                        <Button
                            key={value}
                            variant="secondary"
                            onClick={() => {
                                const newValue =
                                    value === selectedLanguage ? "" : value;
                                setSearchQuery({ selectedLanguage: newValue });
                            }}
                            className={cn(
                                selectedLanguage === value &&
                                    "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/50 hover:bg-blue-500/10 hover:ring-blue-500",
                            )}
                        >
                            <Image
                                src={LANGUAGES[value].logo}
                                alt={label}
                                width={24}
                                height={24}
                                className="size-4 object-contain"
                            />
                            <span className="text-sm">{label}</span>
                        </Button>
                    ))}
                    {(selectedLanguage || search || value) && (
                        <Button
                            variant="ghost"
                            className="gap-x-1 text-gray-300 hover:bg-transparent hover:text-white"
                            size="sm"
                            onClick={() => {
                                setSearchQuery({
                                    selectedLanguage: "",
                                    search: "",
                                });
                                setValue("");
                            }}
                        >
                            <X className="!size-3" />
                            Clear
                        </Button>
                    )}
                </div>
            </div>

            <SnippetList />
        </div>
    );
};
