import { CanvasMode, CanvasState, Point } from "@/types";

import { useMutation } from "@liveblocks/react/suspense";

type Props = {
    canvasState: CanvasState;
    setCanvasState: (state: CanvasState) => void;
};

export const useTranslateSelectedLayer = ({
    canvasState,
    setCanvasState,
}: Props) => {
    return useMutation(
        ({ storage, self }, point: Point) => {
            if (canvasState.mode !== CanvasMode.Translating) {
                return;
            }

            const offset = {
                x: point.x - canvasState.current.x,
                y: point.y - canvasState.current.y,
            };

            const liveLayers = storage.get("layers");
            for (const id of self.presence.selection) {
                const layer = liveLayers.get(id);
                if (layer) {
                    layer.update({
                        x: layer.get("x") + offset.x,
                        y: layer.get("y") + offset.y,
                    });
                }
            }

            setCanvasState({ mode: CanvasMode.Translating, current: point });
        },
        [canvasState, setCanvasState],
    );
};
