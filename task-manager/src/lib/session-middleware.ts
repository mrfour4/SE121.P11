import "server-only";

import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

import { AUTH_COOKIE_NAME } from "@/features/auth/constants";
import { Account, Client, Databases, Models, Storage } from "node-appwrite";

type AdditionalContext = {
    Variables: {
        account: Account;
        databases: Databases;
        storage: Storage;
        user: Models.User<Models.Preferences>;
    };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(
    async (c, next) => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

        const session = getCookie(c, AUTH_COOKIE_NAME);

        if (!session) {
            return c.json({ message: "Unauthorized" }, 401);
        }

        client.setSession(session);

        const account = new Account(client);
        const databases = new Databases(client);
        const storage = new Storage(client);

        const user = await account.get();

        c.set("account", account);
        c.set("databases", databases);
        c.set("storage", storage);
        c.set("user", user);

        await next();
    },
);
