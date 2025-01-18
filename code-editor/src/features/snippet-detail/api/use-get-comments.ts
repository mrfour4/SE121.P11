import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useGetComments = (snippetId: string) => {
    return useQuery(
        convexQuery(api.comments.getComments, {
            snippetId: snippetId as Id<"snippets">,
        }),
    );
};
