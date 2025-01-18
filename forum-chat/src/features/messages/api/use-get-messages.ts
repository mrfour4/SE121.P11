import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const BATCH_SIZE = 10;

type Props = Omit<typeof api.messages.get._args, "paginationOpts">;
export type GetMessagesReturnType =
    (typeof api.messages.get._returnType)["page"];

export const useGetMessages = ({
    channelId,
    conversationId,
    parentMessageId,
}: Props) => {
    const { results, status, loadMore } = usePaginatedQuery(
        api.messages.get,
        { channelId, conversationId, parentMessageId },
        { initialNumItems: BATCH_SIZE },
    );

    return {
        results,
        status,
        loadMore: () => loadMore(BATCH_SIZE),
    };
};
