import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { ThemeProvider } from "@/components/theme-provider";

import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Live Coding",
    description: "Helping you learn to code, live!",
    openGraph: {
        title: "Live Coding",
        description: "Helping you learn to code, live!",
        type: "website",
        locale: "en_US",
        url: process.env.NEXT_PUBLIC_APP_URL!,
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: "Live Coding",
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
        <ClerkProvider
            afterSignOutUrl="/"
            appearance={{
                baseTheme: dark,
            }}
        >
            <html lang="en" suppressHydrationWarning>
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
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                        <Toaster theme="light" richColors />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
