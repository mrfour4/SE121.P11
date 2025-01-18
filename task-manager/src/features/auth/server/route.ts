import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";

import { AUTH_COOKIE_NAME, INTERNAL_ERROR_MESSAGE } from "../constants";
import { loginSchema, registerSchema } from "../schema";

import { createAdminClient } from "@/lib/appwrite";
import { AppwriteException, ID } from "node-appwrite";

import { sessionMiddleware } from "@/lib/session-middleware";

export const auth = new Hono()
    .get("/current", sessionMiddleware, async (c) => {
        const user = c.get("user");
        return c.json({ data: user });
    })
    .post("/login", zValidator("json", loginSchema), async (c) => {
        const { email, password } = c.req.valid("json");

        const { account } = await createAdminClient();

        try {
            const session = await account.createEmailPasswordSession(
                email,
                password,
            );

            setCookie(c, AUTH_COOKIE_NAME, session.secret, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 7,
            });

            return c.json({ message: "login success" });
        } catch (error) {
            if (error instanceof AppwriteException) {
                return c.json({ message: error.message }, 401);
            }

            return c.json({ message: INTERNAL_ERROR_MESSAGE }, 500);
        }
    })
    .post("/register", zValidator("json", registerSchema), async (c) => {
        const { name, email, password } = c.req.valid("json");

        const { account } = await createAdminClient();

        try {
            await account.create(ID.unique(), email, password, name);
            const session = await account.createEmailPasswordSession(
                email,
                password,
            );

            setCookie(c, AUTH_COOKIE_NAME, session.secret, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 7,
            });

            return c.json({ message: "register success" });
        } catch (error) {
            if (error instanceof AppwriteException) {
                return c.json({ message: error.message }, 401);
            }

            return c.json({ message: INTERNAL_ERROR_MESSAGE }, 500);
        }
    })
    .post("/logout", sessionMiddleware, async (c) => {
        const account = c.get("account");

        try {
            deleteCookie(c, AUTH_COOKIE_NAME);
            await account.deleteSession("current");

            return c.json({ message: "logout success" });
        } catch (error) {
            return c.json({ message: INTERNAL_ERROR_MESSAGE }, 500);
        }
    });
