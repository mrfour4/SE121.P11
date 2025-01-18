import {
    DATABASE_ID,
    IMAGES_BUCKET_ID,
    MEMBERS_ID,
    TASKS_ID,
    WORKSPACE_ID,
} from "@/config";
import { MemberRole, Task, TaskStatus, Workspace } from "@/types";

import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { workspaceSchema } from "../schemas";

import { sessionMiddleware } from "@/lib/session-middleware";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";

import { getMember } from "@/features/members/lib/utils";
import { generateInvitedCode } from "@/lib/utils";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";

export const workspace = new Hono()
    .get("/", sessionMiddleware, async (c) => {
        const databases = c.get("databases");
        const user = c.get("user");

        const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
            Query.equal("userId", user.$id),
        ]);

        if (members.total === 0) {
            return c.json({ data: { documents: [], total: 0 } });
        }

        const workspaceIds = members.documents.map(
            (member) => member.workspaceId,
        );

        const workspaces = await databases.listDocuments<Workspace>(
            DATABASE_ID,
            WORKSPACE_ID,
            [
                Query.contains("$id", workspaceIds),
                Query.orderDesc("$createdAt"),
            ],
        );

        return c.json({ data: workspaces });
    })
    .get("/:workspaceId", sessionMiddleware, async (c) => {
        const databases = c.get("databases");
        const user = c.get("user");

        const { workspaceId } = c.req.param();

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

        const workspace = await databases.getDocument<Workspace>(
            DATABASE_ID,
            WORKSPACE_ID,
            workspaceId,
        );

        if (!workspace) {
            return c.json({ message: "Workspace not found" }, 404);
        }

        return c.json({ data: workspace });
    })
    .get("/:workspaceId/info", sessionMiddleware, async (c) => {
        const databases = c.get("databases");

        const { workspaceId } = c.req.param();

        const workspace = await databases.getDocument<Workspace>(
            DATABASE_ID,
            WORKSPACE_ID,
            workspaceId,
        );

        if (!workspace) {
            return c.json({ message: "Workspace not found" }, 404);
        }

        return c.json({
            data: {
                $id: workspace.$id,
                name: workspace.name,
                imageUrl: workspace.imageUrl,
            },
        });
    })
    .post(
        "/",
        zValidator("form", workspaceSchema),
        sessionMiddleware,
        async (c) => {
            const databases = c.get("databases");
            const user = c.get("user");
            const storage = c.get("storage");

            const { name, image } = c.req.valid("form");

            let uploadedImage: string | undefined;

            if (image instanceof Blob) {
                const fileId = ID.unique();
                let extension = image.type.split("/")[1];

                const file = new File(
                    [image],
                    `${name}_${fileId}.${extension}`,
                    {
                        type: image.type,
                    },
                );

                const fileUploaded = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    fileId,
                    file,
                );

                const arrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    fileUploaded.$id,
                );
                uploadedImage = `data:${image.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;
            }

            const workspace = await databases.createDocument(
                DATABASE_ID,
                WORKSPACE_ID,
                ID.unique(),
                {
                    name,
                    userId: user.$id,
                    imageUrl: uploadedImage,
                    inviteCode: generateInvitedCode(),
                },
            );

            await databases.createDocument(
                DATABASE_ID,
                MEMBERS_ID,
                ID.unique(),
                {
                    userId: user.$id,
                    workspaceId: workspace.$id,
                    role: MemberRole.ADMIN,
                },
            );

            return c.json({ data: workspace });
        },
    )
    .patch(
        "/:workspaceId",
        sessionMiddleware,
        zValidator("form", workspaceSchema),
        async (c) => {
            const databases = c.get("databases");
            const user = c.get("user");
            const storage = c.get("storage");

            const { name, image } = c.req.valid("form");
            const { workspaceId } = c.req.param();

            const member = await getMember({
                databases,
                userId: user.$id,
                workspaceId,
            });

            if (!member || member.role !== MemberRole.ADMIN) {
                return c.json(
                    { message: "You are not allowed to perform this action" },
                    403,
                );
            }

            let uploadedImage: string | undefined;

            if (image instanceof Blob) {
                const fileId = ID.unique();
                let extension = image.type.split("/")[1];

                const file = new File(
                    [image],
                    `${name}_${fileId}.${extension}`,
                    {
                        type: image.type,
                    },
                );

                const fileUploaded = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    fileId,
                    file,
                );

                const arrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    fileUploaded.$id,
                );
                uploadedImage = `data:${image.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;
            } else {
                uploadedImage = image;
            }

            const workspace = await databases.updateDocument(
                DATABASE_ID,
                WORKSPACE_ID,
                workspaceId,
                {
                    name,
                    imageUrl: uploadedImage,
                },
            );

            return c.json({ data: workspace });
        },
    )
    .delete("/:workspaceId", sessionMiddleware, async (c) => {
        const databases = c.get("databases");
        const user = c.get("user");

        const { workspaceId } = c.req.param();

        const member = await getMember({
            databases,
            userId: user.$id,
            workspaceId,
        });

        if (!member || member.role !== MemberRole.ADMIN) {
            return c.json(
                { message: "You are not allowed to perform this action" },
                403,
            );
        }

        await databases.deleteDocument(DATABASE_ID, WORKSPACE_ID, workspaceId);

        return c.json({ data: { $id: workspaceId } });
    })
    .post("/:workspaceId/reset-code", sessionMiddleware, async (c) => {
        const databases = c.get("databases");
        const user = c.get("user");

        const { workspaceId } = c.req.param();

        const member = await getMember({
            databases,
            userId: user.$id,
            workspaceId,
        });

        if (!member || member.role !== MemberRole.ADMIN) {
            return c.json(
                { message: "You are not allowed to perform this action" },
                403,
            );
        }

        const workspace = await databases.updateDocument(
            DATABASE_ID,
            WORKSPACE_ID,
            workspaceId,
            {
                inviteCode: generateInvitedCode(),
            },
        );

        return c.json({ data: workspace });
    })
    .post(
        "/:workspaceId/join",
        sessionMiddleware,
        zValidator(
            "json",
            z.object({
                code: z.string().length(6),
            }),
        ),
        async (c) => {
            const databases = c.get("databases");
            const user = c.get("user");

            const { workspaceId } = c.req.param();
            const { code } = c.req.valid("json");

            const member = await getMember({
                databases,
                userId: user.$id,
                workspaceId,
            });

            if (member) {
                return c.json(
                    { message: "You are already a member of this workspace" },
                    400,
                );
            }

            const workspace = await databases.getDocument<Workspace>(
                DATABASE_ID,
                WORKSPACE_ID,
                workspaceId,
            );

            if (!workspace) {
                return c.json({ message: "Workspace not found" }, 404);
            }

            if (workspace.inviteCode !== code) {
                return c.json({ message: "Invalid code" }, 400);
            }

            await databases.createDocument(
                DATABASE_ID,
                MEMBERS_ID,
                ID.unique(),
                {
                    userId: user.$id,
                    workspaceId,
                    role: MemberRole.MEMBER,
                },
            );

            return c.json({ data: workspace });
        },
    )
    .get("/:workspaceId/analytics", sessionMiddleware, async (c) => {
        const databases = c.get("databases");
        const user = c.get("user");

        const { workspaceId } = c.req.param();

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

        const now = new Date();
        const thisMonthStart = startOfMonth(now);
        const thisMonthEnd = endOfMonth(now);
        const lastMonthStart = startOfMonth(subMonths(now, 1));
        const lastMonthEnd = endOfMonth(subMonths(now, 1));

        const thisMonthTasks = await databases.listDocuments<Task>(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("workspaceId", workspaceId),
                Query.greaterThanEqual(
                    "$createdAt",
                    thisMonthStart.toISOString(),
                ),
                Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
            ],
        );

        const lastMonthTasks = await databases.listDocuments<Task>(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("workspaceId", workspaceId),
                Query.greaterThanEqual(
                    "$createdAt",
                    lastMonthStart.toISOString(),
                ),
                Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
            ],
        );

        const taskCount = thisMonthTasks.total;
        const taskDiff = taskCount - lastMonthTasks.total;

        const thisMonthAssignedTasks = await databases.listDocuments<Task>(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("workspaceId", workspaceId),
                Query.equal("assigneeId", member.$id),
                Query.greaterThanEqual(
                    "$createdAt",
                    thisMonthStart.toISOString(),
                ),
                Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
            ],
        );

        const lastMonthAssignedTasks = await databases.listDocuments<Task>(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("workspaceId", workspaceId),
                Query.equal("assigneeId", member.$id),
                Query.greaterThanEqual(
                    "$createdAt",
                    lastMonthStart.toISOString(),
                ),
                Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
            ],
        );

        const assignedTaskCount = thisMonthAssignedTasks.total;
        const assignedTaskDiff =
            assignedTaskCount - lastMonthAssignedTasks.total;

        const thisMonthIncompleteTasks = await databases.listDocuments<Task>(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("workspaceId", workspaceId),
                Query.notEqual("status", TaskStatus.DONE),
                Query.greaterThanEqual(
                    "$createdAt",
                    thisMonthStart.toISOString(),
                ),
                Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
            ],
        );

        const lastMonthIncompleteTasks = await databases.listDocuments<Task>(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("workspaceId", workspaceId),
                Query.notEqual("status", TaskStatus.DONE),
                Query.greaterThanEqual(
                    "$createdAt",
                    lastMonthStart.toISOString(),
                ),
                Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
            ],
        );

        const incompleteTaskCount = thisMonthIncompleteTasks.total;
        const incompleteTaskDiff =
            incompleteTaskCount - lastMonthIncompleteTasks.total;

        const thisMonthCompletedTasks = await databases.listDocuments<Task>(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("workspaceId", workspaceId),
                Query.equal("status", TaskStatus.DONE),
                Query.greaterThanEqual(
                    "$createdAt",
                    thisMonthStart.toISOString(),
                ),
                Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
            ],
        );

        const lastMonthCompletedTasks = await databases.listDocuments<Task>(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("workspaceId", workspaceId),
                Query.equal("status", TaskStatus.DONE),
                Query.greaterThanEqual(
                    "$createdAt",
                    lastMonthStart.toISOString(),
                ),
                Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
            ],
        );

        const completedTaskCount = thisMonthCompletedTasks.total;
        const completedTaskDiff =
            completedTaskCount - lastMonthCompletedTasks.total;

        const thisMonthOverdueTasks = await databases.listDocuments<Task>(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("workspaceId", workspaceId),
                Query.notEqual("status", TaskStatus.DONE),
                Query.lessThan("dueDate", now.toISOString()),
                Query.greaterThanEqual(
                    "$createdAt",
                    thisMonthStart.toISOString(),
                ),
                Query.lessThanEqual("$createdAt", thisMonthEnd.toISOString()),
            ],
        );

        const lastMonthOverdueTasks = await databases.listDocuments<Task>(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("workspaceId", workspaceId),
                Query.notEqual("status", TaskStatus.DONE),
                Query.lessThan("dueDate", now.toISOString()),
                Query.greaterThanEqual(
                    "$createdAt",
                    lastMonthStart.toISOString(),
                ),
                Query.lessThanEqual("$createdAt", lastMonthEnd.toISOString()),
            ],
        );

        const overdueTaskCount = thisMonthOverdueTasks.total;
        const overdueTaskDiff = overdueTaskCount - lastMonthOverdueTasks.total;

        return c.json({
            data: {
                taskCount,
                taskDiff,
                assignedTaskCount,
                assignedTaskDiff,
                incompleteTaskCount,
                incompleteTaskDiff,
                completedTaskCount,
                completedTaskDiff,
                overdueTaskCount,
                overdueTaskDiff,
            },
        });
    });
