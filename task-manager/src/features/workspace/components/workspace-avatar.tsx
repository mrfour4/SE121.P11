import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
    image?: string;
    name: string;
    className?: React.HTMLAttributes<HTMLDivElement>["className"];
};

export const WorkspaceAvatar = ({ image, name, className }: Props) => {
    if (image) {
        return (
            <div
                className={cn(
                    "relative size-10 overflow-hidden rounded-md",
                    className,
                )}
            >
                <Image src={image} alt={name} fill className="object-cover" />
            </div>
        );
    }

    return (
        <Avatar className={cn("size-10 rounded-md", className)}>
            <AvatarFallback className="rounded-md bg-blue-600 text-lg font-semibold uppercase text-white">
                {name[0]}
            </AvatarFallback>
        </Avatar>
    );
};
