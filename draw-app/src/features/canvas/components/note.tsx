import { NoteLayer } from "@/types";

import { useMutation } from "@liveblocks/react/suspense";
import { Kalam } from "next/font/google";

import { cn } from "@/lib/utils";
import {
    calculateFontSize,
    colorToCss,
    getContrastingTextColor,
} from "../lib/utils";

import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"],
});

type Props = {
    id: string;
    layer: NoteLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
};

export const Note = ({ id, layer, onPointerDown, selectionColor }: Props) => {
    const { x, y, width, height, fill, value } = layer;

    const updateValue = useMutation(
        ({ storage }, newValue: string) => {
            const liveLayers = storage.get("layers");
            const layer = liveLayers.get(id);

            if (layer) {
                layer.set("value", newValue);
            }
        },
        [id],
    );

    const onChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
    };

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e) => onPointerDown(e, id)}
            className="shadow-md drop-shadow-xl"
            style={{
                outline: selectionColor
                    ? `1px solid ${selectionColor}`
                    : "none",
                backgroundColor: fill ? colorToCss(fill) : "#fff9b1",
            }}
        >
            <ContentEditable
                html={value || "Text"}
                onChange={onChange}
                className={cn(
                    "flex size-full items-center justify-center text-center outline-none",
                    font.className,
                )}
                style={{
                    color: fill ? getContrastingTextColor(fill) : "#000",
                    fontSize: calculateFontSize(width, height),
                }}
            />
        </foreignObject>
    );
};
