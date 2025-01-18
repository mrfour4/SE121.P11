import { z } from "zod";

export const workspaceSchema = z.object({
    name: z.string().min(1, "Required").max(256, "Too long"),
    image: z
        .union([
            z.instanceof(Blob),
            z.string().transform((value) => (value === "" ? undefined : value)),
        ])
        .optional(),
});
