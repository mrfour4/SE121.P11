import { Skeleton } from "@/components/ui/skeleton";
import { ToggleCardSkeleton } from "@/features/chat/components/toggle-card";

export default function ChatLoading() {
    return (
        <div className="space-y-4 p-6">
            <Skeleton className="h-10 w-[200px]" />
            <div className="space-y-4">
                <ToggleCardSkeleton />
                <ToggleCardSkeleton />
                <ToggleCardSkeleton />
            </div>
        </div>
    );
}
