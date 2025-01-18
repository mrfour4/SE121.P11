import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useGetSnippet = (id: string) => {
    return useQuery(
        convexQuery(api.snippets.getSnippet, { id: id as Id<"snippets"> }),
    );
};
