import { getStroke } from "perfect-freehand";
import { getSvgPathFromStroke } from "../lib/utils";

type Props = {
    x: number;
    y: number;
    points: number[][];
    fill: string;
    onPointerDown?: (event: React.PointerEvent) => void;
    stroke?: string;
};

export const Path = ({ x, y, points, fill, onPointerDown, stroke }: Props) => {
    return (
        <path
            d={getSvgPathFromStroke(
                getStroke(points, {
                    size: 16,
                    thinning: 0.5,
                    smoothing: 0.5,
                    streamline: 0.5,
                }),
            )}
            x={0}
            y={0}
            fill={fill}
            stroke={stroke}
            strokeWidth={1}
            style={{ transform: `translate(${x}px, ${y}px)` }}
            onPointerDown={onPointerDown}
        />
    );
};
