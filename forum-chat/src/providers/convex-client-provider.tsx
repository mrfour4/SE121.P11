"use client";

import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";

import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryKeyHashFn: convexQueryClient.hashFn(),
            queryFn: convexQueryClient.queryFn(),
        },
    },
});

convexQueryClient.connect(queryClient);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider afterSignOutUrl="/sign-in">
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}
