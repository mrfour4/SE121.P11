import { DATABASE_ID, WORKSPACE_ID } from "@/config";
import { getMember } from "@/features/members/lib/utils";
import { createSessionClient } from "@/lib/appwrite";
import { Workspace } from "@/types";

export const getWorkspace = async (workspaceId: string) => {
    const { account, databases } = await createSessionClient();
    const user = await account.get();

    const member = await getMember({
        databases: databases,
        userId: user.$id,
        workspaceId: workspaceId,
    });

    if (!member) {
        throw new Error("You are not a member of this workspace");
    }

    const workspace = await databases.getDocument<Workspace>(
        DATABASE_ID,
        WORKSPACE_ID,
        workspaceId,
    );
    return workspace;
};
