"use client";

import {
    OrganizationSwitcher,
    useOrganization,
    UserButton,
} from "@clerk/nextjs";

import { InviteButton } from "./invite-button";
import { SearchInput } from "./search-input";

export const Navbar = () => {
    const { organization } = useOrganization();

    return (
        <div className="flex items-center gap-x-4 p-5">
            <div className="hidden lg:flex lg:flex-1">
                <SearchInput />
            </div>
            <div className="block flex-1 lg:hidden">
                <OrganizationSwitcher
                    hidePersonal
                    hideSlug
                    appearance={{
                        elements: {
                            rootBox:
                                "flex w-full items-center justify-center max-w-[376px]",
                            organizationSwitcherTrigger:
                                "w-full justify-between rounded-lg border border-[#E5E7EB] bg-white p-1.5",
                            avatarBox: "size-8 bg-transparent",
                        },
                    }}
                />
            </div>
            {organization && <InviteButton />}
            <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />
        </div>
    );
};
