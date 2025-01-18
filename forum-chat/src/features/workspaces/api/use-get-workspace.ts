import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type Props = {
    id: Id<"workspaces">;
};

export const useGetWorkSpace = ({ id }: Props) => {
    const query = useQuery(convexQuery(api.workspaces.getById, { id }));
    return query;
};
