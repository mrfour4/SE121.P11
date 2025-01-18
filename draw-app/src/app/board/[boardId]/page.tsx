"use client";

import { Room } from "@/components/room";

import { Canvas } from "@/features/canvas/components/canvas";
import { RoomLoading } from "@/features/canvas/components/room-loading";

type Props = {
    params: {
        boardId: string;
    };
};

const BoardPage = ({ params }: Props) => {
    const { boardId } = params;

    return (
        <Room roomId={boardId} fallback={<RoomLoading />}>
            <Canvas boardId={boardId} />
        </Room>
    );
};

export default BoardPage;
