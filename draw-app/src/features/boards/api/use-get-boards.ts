import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

export const useGetBoards = (
    orgId: string,
    search?: string,
    favorite?: string,
) => {
    const query = useQuery({
        ...convexQuery(api.board.get, { orgId, search, favorite }),
    });
    return query;
};
