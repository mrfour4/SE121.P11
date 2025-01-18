"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";

import { cn } from "@/lib/utils";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export const OrgSidebar = () => {
    const searchParams = useSearchParams();
    const favorite = searchParams.get("favorite");

    return (
        <div className="hidden w-[206px] flex-col space-y-6 pl-5 pt-5 lg:flex">
            <Link href="/">
                <div className="flex items-center gap-x-2">
                    <Image src="/logo.svg" alt="logo" height={36} width={36} />
                    <span
                        className={cn(
                            "text-2xl font-semibold",
                            poppins.className,
                        )}
                    >
                        Board
                    </span>
                </div>
            </Link>

            <OrganizationSwitcher
                hidePersonal
                hideSlug
                appearance={{
                    elements: {
                        rootBox: "flex w-full items-center justify-center",
                        organizationSwitcherTrigger:
                            "w-full justify-between rounded-lg border border-[#E5E7EB] bg-white p-1.5",
                        avatarBox: "size-8 bg-transparent",
                    },
                }}
            />
            <div className="w-full space-y-1">
                <Button
                    asChild
                    size="lg"
                    variant={favorite ? "ghost" : "secondary"}
                    className="w-full justify-start px-2 font-normal"
                >
                    <Link href="/">
                        <LayoutDashboard className="mr-2 size-4" />
                        Team boards
                    </Link>
                </Button>
                <Button
                    asChild
                    size="lg"
                    variant={favorite ? "secondary" : "ghost"}
                    className="w-full justify-start px-2 font-normal"
                >
                    <Link
                        href={{
                            pathname: "/",
                            query: { favorite: true },
                        }}
                    >
                        <Star className="mr-2 size-4" />
                        Favorite boards
                    </Link>
                </Button>
            </div>
        </div>
    );
};
