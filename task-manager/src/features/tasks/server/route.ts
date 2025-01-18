import { DATABASE_ID, MEMBERS_ID, PROJECTS_ID, TASKS_ID } from "@/config";
import { Member, Project, Task, TaskStatus } from "@/types";
import { MAX_POSITION, POSITION_STEP } from "../constants";

import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { taskSchema } from "../schemas";

import { sessionMiddleware } from "@/lib/session-middleware";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";

import { getMember } from "@/features/members/lib/utils";
import { getMembersInfo } from "@/features/members/queries/get-members-info";
import { createAdminClient } from "@/lib/appwrite";

export const tasks = new Hono()
    .post("/", sessionMiddleware, zValidator("json", taskSchema), async (c) => {
        const user = c.get("user");
        const databases = c.get("databases");

        const {
            name,
            description,
            projectId,
            dueDate,
            assigneeId,
            status,
            workspaceId,
        } = c.req.valid("json");

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

        const highestPositionTask = await databases.listDocuments(
            DATABASE_ID,
            TASKS_ID,
            [
                Query.equal("status", status),
                Query.equal("workspaceId", workspaceId),
                Query.orderAsc("position"),
                Query.limit(1),
            ],
        );

        const newPosition =
            highestPositionTask.documents.length > 0
                ? highestPositionTask.documents[0].position + POSITION_STEP
                : POSITION_STEP;

        const task = await databases.createDocument(
            DATABASE_ID,
            TASKS_ID,
            ID.unique(),
            {
                name,
                description,
                projectId,
                dueDate,
                assigneeId,
                status,
                workspaceId,
                position: newPosition,
            },
        );

        return c.json({ data: task });
    })
    .get(
        "/",
        sessionMiddleware,
        zValidator(
            "query",
            z.object({
                workspaceId: z.string(),
                projectId: z.string().nullish(),
                assigneeId: z.string().nullish(),
                status: z.nativeEnum(TaskStatus).nullish(),
                dueDate: z.string().nullish(),
                search: z.string().nullish(),
            }),
        ),
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");

            const {
                workspaceId,
                projectId,
                assigneeId,
                status,
                dueDate,
                search,
            } = c.req.valid("query");

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

            const query = [
                Query.equal("workspaceId", workspaceId),
                Query.orderDesc("$updatedAt"),
            ];

            if (projectId) {
                console.log("projectId", projectId);
                query.push(Query.equal("projectId", projectId));
            }

            if (assigneeId) {
                console.log("assigneeId", assigneeId);
                query.push(Query.equal("assigneeId", assigneeId));
            }

            if (status) {
                console.log("status", status);
                query.push(Query.equal("status", status));
            }

            if (dueDate) {
                console.log("dueDate", dueDate);
                query.push(Query.equal("dueDate", dueDate));
            }

            if (search) {
                console.log("search", search);
                query.push(Query.search("search", search));
            }

            const tasks = await databases.listDocuments<Task>(
                DATABASE_ID,
                TASKS_ID,
                query,
            );

            const projectIds = tasks.documents.map((task) => task.projectId);
            const assigneeIds = tasks.documents.map((task) => task.assigneeId);

            const projects = await databases.listDocuments<Project>(
                DATABASE_ID,
                PROJECTS_ID,
                projectIds.length > 0
                    ? [Query.contains("$id", projectIds)]
                    : [],
            );

            const members = await databases.listDocuments<Member>(
                DATABASE_ID,
                MEMBERS_ID,
                assigneeIds.length > 0
                    ? [Query.contains("$id", assigneeIds)]
                    : [],
            );

            const assignees = await getMembersInfo(members);

            const populatedTasks = tasks.documents.map((task) => {
                const project = projects.documents.find(
                    (p) => p.$id === task.projectId,
                );
                const assignee = assignees.find(
                    (a) => a.$id === task.assigneeId,
                );

                return {
                    ...task,
                    project,
                    assignee,
                };
            });

            return c.json({
                data: {
                    ...tasks,
                    documents: populatedTasks,
                },
            });
        },
    )
    .get("/:taskId", sessionMiddleware, async (c) => {
        const currentUser = c.get("user");
        const databases = c.get("databases");

        const { users } = await createAdminClient();

        const { taskId } = c.req.param();

        const task = await databases.getDocument<Task>(
            DATABASE_ID,
            TASKS_ID,
            taskId,
        );

        const currentMember = await getMember({
            databases,
            userId: currentUser.$id,
            workspaceId: task.workspaceId,
        });

        if (!currentMember) {
            return c.json(
                { message: "You are not a member of this workspace" },
                403,
            );
        }

        const project = await databases.getDocument<Project>(
            DATABASE_ID,
            PROJECTS_ID,
            task.projectId,
        );

        const member = await databases.getDocument<Member>(
            DATABASE_ID,
            MEMBERS_ID,
            task.assigneeId,
        );

        const user = await users.get(member.userId);
        const assignee = {
            ...member,
            name: user.name,
            email: user.email,
        };

        return c.json({
            data: {
                ...task,
                project,
                assignee,
            },
        });
    })
    .delete(
        "/:taskId",
        sessionMiddleware,
        zValidator("param", z.object({ taskId: z.string() })),
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");

            const { taskId } = c.req.valid("param");

            const task = await databases.getDocument<Task>(
                DATABASE_ID,
                TASKS_ID,
                taskId,
            );

            const member = await getMember({
                databases,
                userId: user.$id,
                workspaceId: task.workspaceId,
            });

            if (!member) {
                return c.json(
                    { message: "You are not a member of this workspace" },
                    403,
                );
            }

            await databases.deleteDocument(DATABASE_ID, TASKS_ID, taskId);
            return c.json({ data: { $id: task.$id } });
        },
    )
    .patch(
        "/:taskId",
        sessionMiddleware,
        zValidator("json", taskSchema.partial()),
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");

            const { taskId } = c.req.param();
            const {
                name,
                description,
                projectId,
                dueDate,
                assigneeId,
                status,
            } = c.req.valid("json");

            const existingTask = await databases.getDocument<Task>(
                DATABASE_ID,
                TASKS_ID,
                taskId,
            );
            const member = await getMember({
                databases,
                userId: user.$id,
                workspaceId: existingTask.workspaceId,
            });

            if (!member) {
                return c.json(
                    { message: "You are not a member of this workspace" },
                    403,
                );
            }

            const task = await databases.updateDocument<Task>(
                DATABASE_ID,
                TASKS_ID,
                taskId,
                {
                    name,
                    description,
                    projectId,
                    dueDate,
                    assigneeId,
                    status,
                },
            );

            return c.json({ data: task });
        },
    )
    .post(
        "/bulk-update",
        sessionMiddleware,
        zValidator(
            "json",
            z.object({
                tasks: z.array(
                    z.object({
                        $id: z.string(),
                        status: z.nativeEnum(TaskStatus),
                        position: z
                            .number()
                            .int()
                            .min(POSITION_STEP)
                            .max(MAX_POSITION),
                    }),
                ),
            }),
        ),
        async (c) => {
            const databases = c.get("databases");
            const user = c.get("user");

            const { tasks } = c.req.valid("json");

            const tasksToUpdate = await databases.listDocuments<Task>(
                DATABASE_ID,
                TASKS_ID,
                [
                    Query.contains(
                        "$id",
                        tasks.map((task) => task.$id),
                    ),
                ],
            );

            const workspaceIds = new Set(
                tasksToUpdate.documents.map((t) => t.workspaceId),
            );
            if (workspaceIds.size !== 1) {
                return c.json(
                    { message: "Tasks must belong to the same workspace" },
                    400,
                );
            }

            const workspaceId = workspaceIds.values().next().value ?? "";

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

            const updatedTasks = await Promise.all(
                tasks.map(async (task) => {
                    const { $id, status, position } = task;
                    return databases.updateDocument<Task>(
                        DATABASE_ID,
                        TASKS_ID,
                        $id,
                        { status, position },
                    );
                }),
            );
            return c.json({ data: updatedTasks });
        },
    );
