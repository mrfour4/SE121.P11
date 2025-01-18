import { Models } from "node-appwrite";

export type ClassName = React.HTMLAttributes<HTMLDivElement>["className"];

export type AppwriteException = {
    message: string;
    code: number;
    type: string;
};

export enum MemberRole {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
}

export enum TaskStatus {
    BACKLOG = "BACKLOG",
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    IN_REVIEW = "IN_REVIEW",
    DONE = "DONE",
}

export type Workspace = Models.Document & {
    name: string;
    imageUrl: string;
    userId: string;
    inviteCode: string;
};

export type Member = Models.Document & {
    workspaceId: string;
    userId: string;
    role: MemberRole;
};

export type Project = Models.Document & {
    workspaceId: string;
    name: string;
    imageUrl: string;
};

export type Task = Models.Document & {
    workspaceId: string;
    projectId: string;
    name: string;
    status: TaskStatus;
    dueDate: string;
    assigneeId: string;
    description: string;
    position: number;
};

export type TaskExtend = Task & {
    project?: Project;
    assignee?: Member & {
        name: string;
        email: string;
    };
};
