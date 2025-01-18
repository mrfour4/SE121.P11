import { CanvasMode, CanvasState, Point } from "@/types";
import { useMutation } from "@liveblocks/react/suspense";

import { findIntersectingLayersWithRectangle } from "../lib/utils";

type Props = {
    layerIds: readonly string[];
    setCanvasState: (state: CanvasState) => void;
};

export const useUpdateSelectionNet = ({ layerIds, setCanvasState }: Props) => {
    return useMutation(
        ({ storage, setMyPresence }, current: Point, origin: Point) => {
            const layers = storage.get("layers").toImmutable();
            setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });

            const ids = findIntersectingLayersWithRectangle(
                layerIds!,
                layers,
                origin,
                current,
            );
            setMyPresence({ selection: ids });
        },
        [layerIds, setCanvasState],
    );
};
