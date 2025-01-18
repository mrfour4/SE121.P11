import { Room } from "@/components/room";
import { RoomLoading } from "@/features/canvas/components/room-loading";
import { CanvasPro } from "@/features/yjs-draw/components/canvas-pro";

type Props = {
    params: {
        boardId: string;
    };
};

export default function PremiumPage({ params }: Props) {
    const { boardId } = params;

    return (
        <Room roomId={boardId} fallback={<RoomLoading />}>
            <CanvasPro boardId={boardId} />
        </Room>
    );
}
