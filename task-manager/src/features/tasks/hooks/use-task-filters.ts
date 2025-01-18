import { TaskStatus } from "@/types";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

export const useTaskFilters = () => {
    return useQueryStates({
        projectId: parseAsString,
        status: parseAsStringEnum(Object.values(TaskStatus)),
        assigneeId: parseAsString,
        dueDate: parseAsString,
        search: parseAsString,
    });
};
