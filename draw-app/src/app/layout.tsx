import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import "./globals.css";

import { Loading } from "@/components/loading";
import { Toaster } from "@/components/ui/sonner";

import { Modals } from "@/components/modals";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Drawing App",
    description:
        "Drawing App is a virtual collaborative whiteboard tool that lets you easily sketch diagrams that have a hand-drawn feel to them.",
    openGraph: {
        title: "Drawing App",
        description:
            "Drawing App is a virtual collaborative whiteboard tool that lets you easily sketch diagrams that have a hand-drawn feel to them.",
        type: "website",
        locale: "en_US",
        url: process.env.NEXT_PUBLIC_APP_URL!,
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: "Drawing App",
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
        <html lang="en" className={inter.className}>
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
            <body>
                <Suspense fallback={<Loading />}>
                    <ConvexClientProvider>
                        <NuqsAdapter>
                            {children}
                            <Modals />
                        </NuqsAdapter>
                        <Toaster theme="light" richColors />
                    </ConvexClientProvider>
                </Suspense>
            </body>
        </html>
    );
}
