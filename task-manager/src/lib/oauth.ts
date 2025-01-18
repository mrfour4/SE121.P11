"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createAdminClient } from "@/lib/appwrite";
import { OAuthProvider } from "node-appwrite";

export async function signInWithGithub() {
    const { account } = await createAdminClient();

    const origin = headers().get("origin");

    const redirectUrl = await account.createOAuth2Token(
        OAuthProvider.Github,
        `${origin}/oauth`,
        `${origin}/sign-in`,
    );

    return redirect(redirectUrl);
}

export async function signInWithGoogle() {
    const { account } = await createAdminClient();

    const origin = headers().get("origin");

    const redirectUrl = await account.createOAuth2Token(
        OAuthProvider.Google,
        `${origin}/oauth`,
        `${origin}/sign-in`,
    );

    return redirect(redirectUrl);
}
