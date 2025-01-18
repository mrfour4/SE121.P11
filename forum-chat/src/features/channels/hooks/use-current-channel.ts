import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

import { useChannelId } from "./use-channel-id";

export const useCurrentChannel = () => {
    const channelId = useChannelId();

    const query = useQuery(
        convexQuery(api.channels.getById, { id: channelId }),
    );

    return query;
};
