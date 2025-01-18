import { LiveblocksProvider } from "@/providers/liveblocks-provider";
import { Suspense } from "react";

type Props = {
    children: React.ReactNode;
};

export default function BoardLayout({ children }: Props) {
    return (
        <Suspense>
            <LiveblocksProvider>{children}</LiveblocksProvider>
        </Suspense>
    );
}
