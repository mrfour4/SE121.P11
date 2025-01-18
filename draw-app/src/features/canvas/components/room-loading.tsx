import { Loader } from "lucide-react";

import { InfoSkeleton } from "./info";
import { ParticipantSkeleton } from "./participant";
import { ToolbarSkeleton } from "./toolbar";

export const RoomLoading = () => {
    return (
        <main className="relative flex size-full touch-none items-center justify-center bg-neutral-100">
            <Loader className="size-6 animate-spin text-muted-foreground" />
            <InfoSkeleton />
            <ParticipantSkeleton />
            <ToolbarSkeleton />
        </main>
    );
};
