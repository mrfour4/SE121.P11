import { DATABASE_ID, MEMBERS_ID } from "@/config";

import { Databases, Query } from "node-appwrite";

type Props = {
    databases: Databases;
    workspaceId: string;
    userId: string;
};

export const getMember = async ({ databases, workspaceId, userId }: Props) => {
    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
        Query.equal("userId", userId),
        Query.equal("workspaceId", workspaceId),
    ]);

    return members.documents[0];
};
