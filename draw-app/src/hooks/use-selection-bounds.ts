import { Layer, XYWH } from "@/types";

import { shallow } from "@liveblocks/client";
import { useSelf, useStorage } from "@liveblocks/react/suspense";

const boundingBox = (layers: Layer[]): XYWH | null => {
    const first = layers[0];
    if (!first) {
        return null;
    }

    let left = first.x;
    let top = first.y;
    let right = first.x + first.width;
    let bottom = first.y + first.height;

    for (let i = 1; i < layers.length; i++) {
        const { x, y, width, height } = layers[i];
        left = Math.min(left, x);
        top = Math.min(top, y);
        right = Math.max(right, x + width);
        bottom = Math.max(bottom, y + height);
    }

    return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top,
    };
};

export const useSelectionBounds = () => {
    const selections = useSelf((me) => me.presence.selection);
    return useStorage((root) => {
        const selectedLayers = selections
            ?.map((layerId) => root.layers.get(layerId)!)
            .filter(Boolean) as Layer[];
        return boundingBox(selectedLayers);
    }, shallow);
};
