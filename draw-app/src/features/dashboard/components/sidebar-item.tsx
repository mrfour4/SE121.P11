"use client";

import Image from "next/image";

import { Hint } from "@/components/hint";
import { cn } from "@/lib/utils";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";

type Props = {
    id: string;
    name: string;
    imageUrl: string;
};

export const SidebarItem = ({ id, name, imageUrl }: Props) => {
    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();

    const isActive = organization?.id === id;

    const onClick = () => {
        if (!setActive) return;

        setActive({ organization: id });
    };

    return (
        <div className="relative aspect-square">
            <Hint label={name} side="right" align="start" sideOffset={18}>
                <Image
                    fill
                    alt={name}
                    src={imageUrl}
                    onClick={onClick}
                    className={cn(
                        "cursor-pointer rounded-md opacity-75 transition hover:opacity-100",
                        isActive && "opacity-100",
                    )}
                />
            </Hint>
        </div>
    );
};
