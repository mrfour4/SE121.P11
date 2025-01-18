import { DATABASE_ID, MEMBERS_ID } from "@/config";
import { Member, MemberRole } from "@/types";

import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import { Hono } from "hono";
import { Query } from "node-appwrite";

import { getMember } from "@/features/members/lib/utils";
import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";

export const members = new Hono()
    .get(
        "/",
        sessionMiddleware,
        zValidator("query", z.object({ workspaceId: z.string() })),
        async (c) => {
            const databases = c.get("databases");
            const user = c.get("user");

            const { users } = await createAdminClient();

            const { workspaceId } = c.req.valid("query");

            const member = await getMember({
                databases,
                userId: user.$id,
                workspaceId,
            });

            if (!member) {
                return c.json(
                    { message: "You are not a member of this workspace" },
                    403,
                );
            }

            const members = await databases.listDocuments<Member>(
                DATABASE_ID,
                MEMBERS_ID,
                [Query.equal("workspaceId", workspaceId)],
            );

            const populatedMembers = await Promise.all(
                members.documents.map(async (member) => {
                    const user = await users.get(member.userId);

                    return {
                        ...member,
                        name: user.name,
                        email: user.email,
                    };
                }),
            );
            return c.json({
                data: {
                    total: members.total,
                    documents: populatedMembers,
                },
            });
        },
    )
    .delete("/:memberId", sessionMiddleware, async (c) => {
        const user = c.get("user");
        const databases = c.get("databases");

        const { memberId } = c.req.param();

        const memberToDelete = await databases.getDocument(
            DATABASE_ID,
            MEMBERS_ID,
            memberId,
        );

        const allMembersInWorkspace = await databases.listDocuments(
            DATABASE_ID,
            MEMBERS_ID,
            [Query.equal("workspaceId", memberToDelete.workspaceId)],
        );

        if (allMembersInWorkspace.total === 1) {
            return c.json(
                {
                    message:
                        "You cannot delete the last member of the workspace",
                },
                400,
            );
        }

        const member = await getMember({
            databases,
            userId: user.$id,
            workspaceId: memberToDelete.workspaceId,
        });

        if (!member || member.role !== MemberRole.ADMIN) {
            return c.json(
                { message: "You are not allowed to perform this action" },
                403,
            );
        }

        await databases.deleteDocument(DATABASE_ID, MEMBERS_ID, memberId);

        return c.json({ data: { $id: memberToDelete.$id } });
    })
    .patch(
        "/:memberId",
        sessionMiddleware,
        zValidator("json", z.object({ role: z.nativeEnum(MemberRole) })),
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");

            const { memberId } = c.req.param();
            const { role } = c.req.valid("json");

            const memberToUpdate = await databases.getDocument(
                DATABASE_ID,
                MEMBERS_ID,
                memberId,
            );

            const allMembersInWorkspace = await databases.listDocuments(
                DATABASE_ID,
                MEMBERS_ID,
                [Query.equal("workspaceId", memberToUpdate.workspaceId)],
            );

            if (allMembersInWorkspace.total === 1) {
                return c.json(
                    {
                        message:
                            "You cannot downgrade the last member of the workspace",
                    },
                    400,
                );
            }

            const member = await getMember({
                databases,
                userId: user.$id,
                workspaceId: memberToUpdate.workspaceId,
            });

            if (!member || member.role !== MemberRole.ADMIN) {
                return c.json(
                    { message: "You are not allowed to perform this action" },
                    403,
                );
            }

            await databases.updateDocument(DATABASE_ID, MEMBERS_ID, memberId, {
                role,
            });

            return c.json({ data: { $id: memberId, role } });
        },
    );
