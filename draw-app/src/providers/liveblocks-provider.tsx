"use client";

import { LiveblocksProvider as LiveblocksProviderPrimitive } from "@liveblocks/react";
import { PropsWithChildren } from "react";

export function LiveblocksProvider({ children }: PropsWithChildren) {
    return (
        <LiveblocksProviderPrimitive
            authEndpoint="/api/liveblocks-auth"
            throttle={16}
        >
            {children}
        </LiveblocksProviderPrimitive>
    );
}
