import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

export const useGetLastExecution = () => {
    return useQuery(convexQuery(api.codeExecutions.getLastExecution, {}));
};
