import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useGetUser = (userId: string) => {
    return useQuery(
        convexQuery(api.users.getUser, { userId: userId as Id<"users"> }),
    );
};
