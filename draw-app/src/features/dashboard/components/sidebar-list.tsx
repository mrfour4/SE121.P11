"use client";

import { Button } from "@/components/ui/button";

import { Loader } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

import { useOrganizationList } from "@clerk/nextjs";

export const SideBarList = () => {
    const { userMemberships, isLoaded } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });

    if (!isLoaded) {
        return (
            <Button variant="ghost" disabled size="icon">
                <Loader className="size-4 animate-spin text-accent" />
            </Button>
        );
    }

    return (
        <div className="space-y-4">
            {userMemberships.data?.map((mem) => (
                <SidebarItem
                    key={mem.organization.id}
                    id={mem.organization.id}
                    name={mem.organization.name}
                    imageUrl={mem.organization.imageUrl}
                />
            ))}
        </div>
    );
};
