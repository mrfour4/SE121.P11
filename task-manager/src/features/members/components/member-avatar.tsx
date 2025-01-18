import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ClassName } from "@/types";

type Props = {
    name?: string;
    className?: ClassName;
    fallbackClassName?: ClassName;
};

export const MemberAvatar = ({
    name = "Anonymous",
    className,
    fallbackClassName,
}: Props) => {
    return (
        <Avatar
            className={cn(
                "size-5 rounded-full border border-neutral-300 transition",
                className,
            )}
        >
            <AvatarFallback
                className={cn(
                    "flex items-center justify-center bg-neutral-200 font-medium text-neutral-500",
                    fallbackClassName,
                )}
            >
                {name[0].toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
};
