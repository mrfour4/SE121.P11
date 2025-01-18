import { TaskStatus } from "@/types";
import { z } from "zod";

export const taskSchema = z.object({
    name: z.string().min(1, "Required"),
    status: z.nativeEnum(TaskStatus, { required_error: "Required" }),
    workspaceId: z.string().min(1, "Required"),
    projectId: z.string().min(1, "Required"),
    dueDate: z.coerce.date(),
    assigneeId: z.string().min(1, "Required"),
    description: z.string().optional(),
});
