import { createAdminClient } from "@/lib/appwrite";
import { Member } from "@/types";
import { Models } from "node-appwrite";

type Members = Models.DocumentList<Member>;

export const getMembersInfo = async (members: Members) => {
    const { users } = await createAdminClient();
    return await Promise.all(
        members.documents.map(async (member) => {
            const user = await users.get(member.userId);
            return {
                ...member,
                name: user.name,
                email: user.email,
            };
        }),
    );
};
