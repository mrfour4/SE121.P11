import { EllipseLayer } from "@/types";
import { colorToCss } from "../lib/utils";

type Props = {
    id: string;
    layer: EllipseLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
};

export const Ellipse = ({
    id,
    layer,
    onPointerDown,
    selectionColor,
}: Props) => {
    const { x, y, width, height, fill } = layer;

    return (
        <ellipse
            cx={width / 2}
            cy={height / 2}
            rx={width / 2}
            ry={height / 2}
            fill={fill ? colorToCss(fill) : "#3b82f6"}
            stroke={selectionColor || "transparent"}
            strokeWidth={1}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            onPointerDown={(e) => onPointerDown(e, id)}
        />
    );
};
