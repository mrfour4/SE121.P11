"use client";

import { LayerType } from "@/types";

import { Ellipse } from "./ellipse";
import { Note } from "./note";
import { Path } from "./path";
import { Rectangle } from "./rectangle";
import { Text } from "./text";

import { useStorage } from "@liveblocks/react/suspense";
import { colorToCss } from "../lib/utils";

type Props = {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string;
};

export const LayerPreview = ({
    id,
    onLayerPointerDown,
    selectionColor,
}: Props) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
        return null;
    }

    switch (layer.type) {
        case LayerType.Path: {
            return (
                <Path
                    key={id}
                    points={layer.points}
                    x={layer.x}
                    y={layer.y}
                    fill={layer.fill ? colorToCss(layer.fill) : "#000"}
                    stroke={selectionColor}
                    onPointerDown={(e) => onLayerPointerDown(e, id)}
                />
            );
        }
        case LayerType.Text: {
            return (
                <Text
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            );
        }
        case LayerType.Note: {
            return (
                <Note
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            );
        }
        case LayerType.Ellipse: {
            return (
                <Ellipse
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            );
        }
        case LayerType.Rectangle: {
            return (
                <Rectangle
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColor={selectionColor}
                />
            );
        }
        default: {
            console.warn("Unknown layer type");
            return null;
        }
    }
};
