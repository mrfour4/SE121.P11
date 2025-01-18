import { TOOLS_MOBILE } from "@/features/dashboard/constants";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";

import { Logo } from "@/components/logo";
import { Navigation } from "@/components/navigation";

export const Nav = () => {
    return (
        <>
            <div className="hidden items-center justify-start gap-8 lg:flex">
                <Logo />
                <Navigation />
            </div>
            <NavMobile />
        </>
    );
};

export const NavMobile = () => {
    return (
        <Sheet>
            <SheetTrigger className="absolute lg:hidden" asChild>
                <Button variant="outline" size="icon">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#0a0a0f]">
                <SheetHeader>
                    <SheetTitle className="inline-flex items-center gap-2">
                        <Logo />
                    </SheetTitle>
                </SheetHeader>

                <div className="mt-4">
                    {TOOLS_MOBILE.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-2 rounded-lg p-4 text-sm hover:bg-[#1e1e2e]/80 hover:text-blue-400"
                        >
                            <item.icon className="size-5" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};
