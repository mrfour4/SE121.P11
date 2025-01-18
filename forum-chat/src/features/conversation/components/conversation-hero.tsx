import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
    name?: string;
    image?: string;
};

export const ConversationHero = ({ name = "Member", image }: Props) => {
    return (
        <div className="mt-20 mx-5 mb-4">
            <div className="flex items-center gap-x-1 mb-2">
                <Avatar className="size-14 mr-2">
                    <AvatarImage src={image} alt={name} />
                    <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
                </Avatar>

                <p className="text-2xl font-bold "># {name}</p>
            </div>
            <p className="font-normal text-slate-800 mb-4">
                This is conversation is just between you and{" "}
                <strong>{name}</strong>
            </p>
        </div>
    );
};
