import { format } from "date-fns";

type Props = {
    name: string;
    createTime: number;
};

export const ChannelHero = ({ name, createTime }: Props) => {
    return (
        <div className="mt-20 mx-5 mb-4">
            <p className="text-2xl font-bold flex items-center mb-2">
                # {name}
            </p>

            <p className="font-normal text-slate-800 mb-4">
                This channel was created on{" "}
                {format(createTime, "MMMM do, yyyy")}. This is the very begging
                of the <strong>{name}</strong> channel.
            </p>
        </div>
    );
};
