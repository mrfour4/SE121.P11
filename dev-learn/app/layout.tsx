import QueryProvider from "@/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";

import { Toaster } from "@/components/ui/sonner";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dev Learn",
    description:
        "Advance your web development and software engineering skills from front-end to full-stack!",
    openGraph: {
        title: "Dev Learn",
        description:
            "Advance your web development and software engineering skills from front-end to full-stack!",
        type: "website",
        locale: "en_US",
        url: process.env.NEXT_PUBLIC_APP_URL!,
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: "Dev Learn",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider afterSignOutUrl="/sign-in">
            <html lang="en">
                <head>
                    <link
                        rel="icon"
                        type="image/png"
                        href="/favicon/favicon-96x96.png"
                        sizes="96x96"
                    />
                    <link
                        rel="icon"
                        type="image/svg+xml"
                        href="/favicon/favicon.svg"
                    />
                    <link rel="shortcut icon" href="/favicon/favicon.ico" />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/favicon/apple-touch-icon.png"
                    />
                    <link rel="manifest" href="/favicon/site.webmanifest" />
                </head>
                <body className={inter.className}>
                    <NextSSRPlugin
                        routerConfig={extractRouterConfig(ourFileRouter)}
                    />
                    <QueryProvider>{children}</QueryProvider>
                    <Toaster richColors theme="light" position="top-center" />
                </body>
            </html>
        </ClerkProvider>
    );
}
