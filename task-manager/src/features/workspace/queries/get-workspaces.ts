import { DATABASE_ID, MEMBERS_ID, WORKSPACE_ID } from "@/config";
import { createSessionClient } from "@/lib/appwrite";
import { Query } from "node-appwrite";

export const getWorkspaces = async () => {
    const { account, databases } = await createSessionClient();
    const user = await account.get();

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
        Query.equal("userId", user.$id),
    ]);

    if (members.total === 0) {
        return { total: 0, documents: [] };
    }

    const workspaceIds =
        members.documents.map((member) => member.workspaceId) ?? [];

    const workspaces = await databases.listDocuments(
        DATABASE_ID,
        WORKSPACE_ID,
        [Query.contains("$id", workspaceIds), Query.orderDesc("$createdAt")],
    );

    return workspaces;
};
