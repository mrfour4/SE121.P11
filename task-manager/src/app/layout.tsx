import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { cn } from "@/lib/utils";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Task Manager",
    description: "Helps you manage your tasks efficiently",
    openGraph: {
        title: "Task Manager",
        description: "Helps you manage your tasks efficiently",
        type: "website",
        locale: "en_US",
        url: process.env.NEXT_PUBLIC_APP_URL!,
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: "Task Manager",
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
            <body className={cn(inter.className, "min-h-screen antialiased")}>
                <QueryProvider>
                    <NuqsAdapter>{children}</NuqsAdapter>
                </QueryProvider>
                <Toaster richColors theme="light" />
            </body>
        </html>
    );
}
