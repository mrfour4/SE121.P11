import { RectangleLayer } from "@/types";
import { colorToCss } from "../lib/utils";

type Props = {
    id: string;
    layer: RectangleLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
};

export const Rectangle = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}: Props) => {
    const { x, y, width, height, fill } = layer;

    return (
        <rect
            className="drop-shadow-md"
            onPointerDown={(e) => onPointerDown(e, id)}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            x={0}
            y={0}
            width={width}
            height={height}
            strokeWidth={1}
            fill={fill ? colorToCss(fill) : "#3b82f6"}
            stroke={selectionColor || "transparent"}
        />
    );
};
