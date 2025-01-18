import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useGetMemberById = (id: Id<"members">) => {
    const query = useQuery(convexQuery(api.members.getById, { id }));

    return query;
};
