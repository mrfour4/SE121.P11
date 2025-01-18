"use client";

import { cn } from "@/lib/utils";
import { TRoute } from "../types";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface Props extends TRoute {}

export const SidebarItem = ({ label, href, icon: Icon }: Props) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive =
        (pathname === "/" && href === "/") ||
        pathname === href ||
        pathname.startsWith(`${href}/`);

    const onClick = () => {
        router.push(href);
    };

    return (
        <Link
            type="button"
            className={cn(
                "flex items-center gap-x-2 pl-6 transition-all text-slate-500 text-sm font-medium hover:text-slate-600 hover:bg-slate-300/70",
                isActive &&
                    "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
            )}
            href={href}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    className={cn(
                        "size-5 text-slate-500",
                        isActive && "text-sky-700"
                    )}
                />

                {label}
            </div>

            <div
                className={cn(
                    "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
                    isActive && "opacity-100"
                )}
            />
        </Link>
    );
};
