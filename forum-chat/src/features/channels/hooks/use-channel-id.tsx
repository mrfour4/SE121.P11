import { useParams } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";

export const useChannelId = () => {
    const { channelId } = useParams<{ channelId: Id<"channels"> }>();

    return channelId;
};
