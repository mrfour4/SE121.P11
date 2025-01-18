import { useOther } from "@liveblocks/react/suspense";
import { memo } from "react";

import { MousePointer2 } from "lucide-react";

import { connectionIdToColor } from "../lib/utils";

type Props = {
    connectionId: number;
};

export const Cursor = memo(({ connectionId }: Props) => {
    const info = useOther(connectionId, (user) => user.info);
    const cursor = useOther(connectionId, (user) => user.presence.cursor);

    const name = info?.name || "Anonymous";

    if (!cursor) {
        return null;
    }

    const { x, y } = cursor;
    const color = connectionIdToColor(connectionId);

    return (
        <foreignObject
            height={50}
            width={name.length * 10 + 24}
            className="relative drop-shadow-md"
            style={{ transform: `translate(${x}px, ${y}px)` }}
        >
            <MousePointer2 className="size-5" style={{ fill: color, color }} />
            <div
                className="absolute left-5 rounded-md px-1.5 py-0.5 text-xs font-semibold text-white"
                style={{ backgroundColor: color }}
            >
                {name}
            </div>
        </foreignObject>
    );
});

Cursor.displayName = "Cursor";
