"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { iconMap } from "../constant";

import qs from "query-string";

type Props = {
    label: string;
    value: string;
};

export const CategoryItem = ({ label, value }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId");
    const title = searchParams.get("title");

    const isSelected = categoryId === value;

    const Icon = iconMap[label];

    const onClick = () => {
        const url = qs.stringifyUrl(
            {
                url: pathname,
                query: {
                    title,
                    categoryId: isSelected ? null : value,
                },
            },
            { skipNull: true, skipEmptyString: true }
        );

        router.push(url);
    };

    return (
        <button
            className={cn(
                "flex-shrink-0 py-2 px-3 text-sm border border-slate-200 hover:border-sky-700 rounded-full flex items-center gap-x-2 transition",
                isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
            )}
            onClick={onClick}
        >
            {Icon && <Icon className="size-5" />}
            <p className="truncate">{label}</p>
        </button>
    );
};
