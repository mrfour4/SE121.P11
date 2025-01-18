import { StreamPlayerSkeleton } from "@/features/stream/components/stream-player";

export default function CreatorLoading() {
    return (
        <div className="h-full">
            <StreamPlayerSkeleton />
        </div>
    );
}
