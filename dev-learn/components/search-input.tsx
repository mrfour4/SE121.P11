"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "./ui/input";

import { Search } from "lucide-react";

import qs from "query-string";
import { useDebouncedCallback } from "use-debounce";

export const SearchInput = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId");

    const debounced = useDebouncedCallback((value: string) => {
        const url = qs.stringifyUrl(
            {
                url: pathname,
                query: {
                    categoryId,
                    title: value,
                },
            },
            { skipNull: true, skipEmptyString: true }
        );
        router.push(url);
    }, 500);

    return (
        <div className="relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
            <Input
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder="Search for a course"
                onChange={(e) => debounced(e.target.value)}
            />
        </div>
    );
};
