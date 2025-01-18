import { z } from "zod";

export const projectSchema = z.object({
    name: z.string().min(1, "Required"),
    workspaceId: z.string(),
    image: z
        .union([
            z.instanceof(Blob),
            z.string().transform((value) => (value === "" ? undefined : value)),
        ])
        .optional(),
});
