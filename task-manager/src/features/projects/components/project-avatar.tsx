import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { ClassName } from "@/types";

type Props = {
    image?: string;
    name?: string;
    className?: ClassName;
    fallbackClassName?: ClassName;
};

export const ProjectAvatar = ({
    image,
    name = "Unnamed Project",
    className,
    fallbackClassName,
}: Props) => {
    if (image) {
        return (
            <div
                className={cn(
                    "relative size-5 overflow-hidden rounded-md",
                    className,
                )}
            >
                <Image src={image} alt={name} fill className="object-cover" />
            </div>
        );
    }

    return (
        <Avatar className={cn("size-5 rounded-md", className)}>
            <AvatarFallback
                className={cn(
                    "rounded-md bg-blue-600 text-sm font-medium uppercase text-white",
                    fallbackClassName,
                )}
            >
                {name[0]}
            </AvatarFallback>
        </Avatar>
    );
};
