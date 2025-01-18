import { DATABASE_ID, IMAGES_BUCKET_ID, PROJECTS_ID, TASKS_ID } from "@/config";
import { Project, Task, TaskStatus } from "@/types";

import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { projectSchema } from "../schemas";

import { sessionMiddleware } from "@/lib/session-middleware";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";

import { getMember } from "@/features/members/lib/utils";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";

export const projects = new Hono()
    .get(
        "/",
        sessionMiddleware,
        zValidator("query", z.object({ workspaceId: z.string() })),
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");

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

            const projects = await databases.listDocuments<Project>(
                DATABASE_ID,
                PROJECTS_ID,
                [
                    Query.equal("workspaceId", workspaceId),
                    Query.orderDesc("$createdAt"),
                ],
            );

            return c.json({ data: projects });
        },
    )
    .get("/:projectId", sessionMiddleware, async (c) => {
        const user = c.get("user");
        const databases = c.get("databases");

        const { projectId } = c.req.param();

        const project = await databases.getDocument<Project>(
            DATABASE_ID,
            PROJECTS_ID,
            projectId,
        );

        const member = await getMember({
            databases,
            userId: user.$id,
            workspaceId: project.workspaceId,
        });

        if (!member) {
            return c.json(
                { message: "You are not a member of this workspace" },
                403,
            );
        }

        return c.json({ data: project });
    })
    .get("/:projectId/analytics", sessionMiddleware, async (c) => {
        const databases = c.get("databases");
        const user = c.get("user");

        const { projectId } = c.req.param();

        const project = await databases.getDocument<Project>(
            DATABASE_ID,
            PROJECTS_ID,
            projectId,
        );

        const member = await getMember({
            databases,
            userId: user.$id,
            workspaceId: project.workspaceId,
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
                Query.equal("projectId", projectId),
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
                Query.equal("projectId", projectId),
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
                Query.equal("projectId", projectId),
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
                Query.equal("projectId", projectId),
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
                Query.equal("projectId", projectId),
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
                Query.equal("projectId", projectId),
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
                Query.equal("projectId", projectId),
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
                Query.equal("projectId", projectId),
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
                Query.equal("projectId", projectId),
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
                Query.equal("projectId", projectId),
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
    })
    .post(
        "/",
        sessionMiddleware,
        zValidator("form", projectSchema),
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");
            const storage = c.get("storage");

            const { name, workspaceId, image } = c.req.valid("form");

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

            let uploadedImage: string | undefined;

            if (image instanceof Blob) {
                const fileId = ID.unique();
                const extension = image.type.split("/")[1];
                const file = new File(
                    [image],
                    `${name}_${fileId}.${extension}`,
                    { type: image.type },
                );

                const fileUpload = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    fileId,
                    file,
                );
                const arrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    fileUpload.$id,
                );
                uploadedImage = `data:${image.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;
            }

            const project = await databases.createDocument<Project>(
                DATABASE_ID,
                PROJECTS_ID,
                ID.unique(),
                {
                    name,
                    workspaceId,
                    imageUrl: uploadedImage,
                },
            );

            return c.json({ data: project });
        },
    )
    .patch(
        "/:projectId",
        sessionMiddleware,
        zValidator("form", projectSchema),
        async (c) => {
            const databases = c.get("databases");
            const user = c.get("user");
            const storage = c.get("storage");

            const { name, image } = c.req.valid("form");
            const { projectId } = c.req.param();

            const project = await databases.getDocument<Project>(
                DATABASE_ID,
                PROJECTS_ID,
                projectId,
            );

            const member = await getMember({
                databases,
                userId: user.$id,
                workspaceId: project.workspaceId,
            });

            if (!member) {
                return c.json(
                    { message: "You are not a member of this workspace" },
                    403,
                );
            }

            let uploadedImage: string | undefined;

            if (image instanceof Blob) {
                const fileId = ID.unique();
                const extension = image.type.split("/")[1];
                const file = new File(
                    [image],
                    `${name}_${fileId}.${extension}`,
                    {
                        type: image.type,
                    },
                );

                const fileUpload = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    fileId,
                    file,
                );
                const arrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    fileUpload.$id,
                );
                uploadedImage = `data:${image.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;
            } else {
                uploadedImage = image;
            }

            const updatedProject = await databases.updateDocument<Project>(
                DATABASE_ID,
                PROJECTS_ID,
                projectId,
                {
                    name,
                    imageUrl: uploadedImage,
                },
            );

            return c.json({ data: updatedProject });
        },
    )
    .delete("/:projectId", sessionMiddleware, async (c) => {
        const databases = c.get("databases");
        const user = c.get("user");

        const { projectId } = c.req.param();

        const project = await databases.getDocument<Project>(
            DATABASE_ID,
            PROJECTS_ID,
            projectId,
        );

        const member = await getMember({
            databases,
            userId: user.$id,
            workspaceId: project.workspaceId,
        });

        if (!member) {
            return c.json(
                { message: "You are not a member of this workspace" },
                403,
            );
        }

        await databases.deleteDocument(DATABASE_ID, PROJECTS_ID, projectId);

        return c.json({ data: { $id: projectId } });
    });
