import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useGetBoard = (id: string) => {
    const query = useQuery({
        ...convexQuery(api.board.getById, { id: id as Id<"boards"> }),
    });
    return query;
};
