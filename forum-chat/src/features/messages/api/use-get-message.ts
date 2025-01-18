import { Id } from "../../../../convex/_generated/dataModel";

import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

export const useGetMessageById = (id: Id<"messages">) => {
    const query = useQuery(convexQuery(api.messages.getById, { id }));

    return query;
};
