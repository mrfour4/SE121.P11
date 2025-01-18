import { CanvasMode, CanvasState, Color, LayerType, Point } from "@/types";
import { LiveObject } from "@liveblocks/client";

import { useMutation } from "@liveblocks/react/suspense";
import { nanoid } from "nanoid";

import { MAX_LAYERS } from "../constant";

type Props = {
    lastUsedColor: Color;
    setCanvasState: (state: CanvasState) => void;
};

export const useInsertLayer = ({ lastUsedColor, setCanvasState }: Props) => {
    return useMutation(
        (
            { storage, setMyPresence },
            layerType:
                | LayerType.Ellipse
                | LayerType.Rectangle
                | LayerType.Text
                | LayerType.Note,
            position: Point,
        ) => {
            const liveLayers = storage.get("layers");
            const liveLayerIds = storage.get("layerIds");

            if (liveLayers.size >= MAX_LAYERS) {
                return;
            }

            const layerId = nanoid();
            const layer = new LiveObject({
                type: layerType,
                x: position.x,
                y: position.y,
                height: 100,
                width: 100,
                fill: lastUsedColor,
            });

            liveLayerIds.push(layerId);
            liveLayers.set(layerId, layer);

            setMyPresence({ selection: [layerId] }, { addToHistory: true });
            setCanvasState({ mode: CanvasMode.None });
        },
        [lastUsedColor, setCanvasState],
    );
};
