import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";

type Props = {
    src?: string;
    className?: HTMLImageElement["className"];
};

export const UserAvatar = ({ src, className }: Props) => {
    return (
        <Avatar className={className}>
            <AvatarImage src={src} />
            <AvatarFallback>
                <UserIcon className="size-4 text-[#808086]" />
            </AvatarFallback>
        </Avatar>
    );
};
