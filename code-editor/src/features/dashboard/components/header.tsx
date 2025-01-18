"use client";

import { SignedIn } from "@clerk/nextjs";

import { Nav } from "@/components/nav";
import { ProfileButton } from "@/components/profile-button";
import { Separator } from "@/components/ui/separator";

import { ShareSnippet } from "../../snippets/components/share-snippet";
import { LanguageSelector } from "./language-selector";
import { ThemeSelector } from "./theme-selector";

export const Header = () => {
    return (
        <header className="relative z-10">
            <div className="mb-4 flex items-end justify-between rounded-lg bg-[#0a0a0f]/80 p-6 backdrop-blur-xl sm:items-center">
                <Nav />

                <div className="ml-auto flex flex-wrap items-center justify-end gap-x-2 gap-y-3 lg:py-0">
                    <ThemeSelector />
                    <LanguageSelector />

                    <div className="flex items-center justify-between gap-3">
                        <SignedIn>
                            <ShareSnippet />
                        </SignedIn>

                        <Separator
                            orientation="vertical"
                            className="mx-1 h-8 w-0.5"
                        />

                        <ProfileButton />
                    </div>
                </div>
            </div>
        </header>
    );
};
