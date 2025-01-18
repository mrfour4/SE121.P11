import { Id } from "../../convex/_generated/dataModel";

export enum Theme {
    Default = "vs-dark",
    Dracula = "dracula",
    NightOwl = "nightOwl",
    Github = "github",
    Cobalt = "cobalt",
}

export enum Language {
    JavaScript = "javascript",
    TypeScript = "typescript",
    Python = "python",
    Java = "java",
    Cpp = "cpp",
    CSharp = "csharp",
}

export type DraftCode = {
    language: Language;
    code?: string;
};

export type Snippet = {
    _id: Id<"snippets">;
    _creationTime: number;
    userId: string;
    language: string;
    code: string;
    title: string;
    userName: string;
};

export type Comment = {
    _id: Id<"comments">;
    _creationTime: number;
    userId: string;
    userName: string;
    snippetId: Id<"snippets">;
    content: string;
};
