import { CanvasMode, CanvasState, Color } from "@/types";
import { LiveObject } from "@liveblocks/client";

import { useMutation } from "@liveblocks/react/suspense";
import { nanoid } from "nanoid";

import { MAX_LAYERS } from "../constant";
import { penPointsToPathLayer } from "../lib/utils";

type Props = {
    lastUsedColor: Color;
    setCanvasState: (state: CanvasState) => void;
};

export const useInsertPath = ({ lastUsedColor, setCanvasState }: Props) => {
    return useMutation(
        ({ storage, self, setMyPresence }) => {
            const liveLayers = storage.get("layers");
            const { pencilDraft } = self.presence;

            if (
                pencilDraft === null ||
                pencilDraft.length < 2 ||
                liveLayers.size >= MAX_LAYERS
            ) {
                setMyPresence({ pencilDraft: null });
                return;
            }

            // console.log("insertPath");

            const id = nanoid();
            liveLayers.set(
                id,
                new LiveObject(
                    penPointsToPathLayer(pencilDraft, lastUsedColor),
                ),
            );

            const liveLayerIds = storage.get("layerIds");
            liveLayerIds.push(id);

            setMyPresence({ pencilDraft: null });
            setCanvasState({ mode: CanvasMode.Pencil });
        },
        [lastUsedColor, setCanvasState],
    );
};
