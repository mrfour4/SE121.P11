import { Chapter } from "@prisma/client";

export type ReorderChapter = Pick<Chapter, "id" | "position">;
