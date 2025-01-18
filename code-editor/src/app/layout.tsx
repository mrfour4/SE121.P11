import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Loading } from "@/components/loading";
import { Toaster } from "@/components/ui/sonner";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "LMS Code Editor",
    description:
        "LMS Code Editor is a web-based code editor that allows you to write, run, and share code in your browser.",
    openGraph: {
        title: "LMS Code Editor",
        description:
            "LMS Code Editor is a web-based code editor that allows you to write, run, and share code in your browser.",
        type: "website",
        locale: "en_US",
        url: process.env.NEXT_PUBLIC_APP_URL!,
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: "LMS Code Editor",
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
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Suspense fallback={<Loading />}>
                        <ConvexClientProvider>
                            <NuqsAdapter>{children}</NuqsAdapter>
                            <Toaster richColors theme="light" />
                        </ConvexClientProvider>
                    </Suspense>
                </ThemeProvider>
            </body>
        </html>
    );
}
