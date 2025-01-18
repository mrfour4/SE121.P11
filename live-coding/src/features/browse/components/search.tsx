"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SearchIcon, X } from "lucide-react";

import qs from "query-string";

export const Search = () => {
    const router = useRouter();
    const [value, setValue] = useState("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!value) return;

        const url = qs.stringifyUrl(
            {
                url: "/search",
                query: { term: value },
            },
            { skipEmptyString: true, skipNull: true },
        );

        router.push(url);
    };

    const onClear = () => {
        setValue("");
    };

    return (
        <form
            className="relative flex w-full items-center lg:w-[400px]"
            onSubmit={onSubmit}
        >
            <Input
                className="h-9 rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                placeholder="Search"
                onChange={(e) => setValue(e.target.value)}
                value={value}
            />

            {value && (
                <X
                    className="absolute right-14 top-2.5 size-5 cursor-pointer text-muted-foreground transition hover:opacity-75"
                    onClick={onClear}
                />
            )}
            <Button
                type="submit"
                size="sm"
                variant="secondary"
                className="rounded-l-none"
            >
                <SearchIcon className="!size-5 text-muted-foreground" />
            </Button>
        </form>
    );
};
