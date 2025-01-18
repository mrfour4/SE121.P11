import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Modals } from "@/components/modals";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { ModalStoreProvider } from "@/providers/modal-store-provider";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DevTalk Hub: Code, Learn, and Collaborate",
    description:
        "Join DevTalk Hub, the ultimate forum for developers and enthusiasts to discuss coding, explore web development, and collaborate on projects. Share ideas, solve challenges, and grow your skills in a vibrant tech community!",
    openGraph: {
        title: "DevTalk Hub: Code, Learn, and Collaborate",
        description:
            "Join DevTalk Hub, the ultimate forum for developers and enthusiasts to discuss coding, explore web development, and collaborate on projects. Share ideas, solve challenges, and grow your skills in a vibrant tech community!",
        type: "website",
        locale: "en_US",
        url: process.env.NEXT_PUBLIC_APP_URL!,
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: "DevTalk Hub: Code, Learn, and Collaborate",
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
            <body className={inter.className}>
                <ConvexClientProvider>
                    <ModalStoreProvider>
                        <NuqsAdapter>{children}</NuqsAdapter>
                        <Modals />
                    </ModalStoreProvider>
                </ConvexClientProvider>
                <Toaster richColors theme="light" position="top-center" />
            </body>
        </html>
    );
}
