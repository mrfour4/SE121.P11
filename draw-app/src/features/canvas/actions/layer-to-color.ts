import { useOthersMapped } from "@liveblocks/react/suspense";
import { useMemo } from "react";

import { connectionIdToColor } from "../lib/utils";

export const useLayerIdsToColorSelection = () => {
    const selections = useOthersMapped((other) => other.presence.selection);

    return useMemo(() => {
        const layerIdsToColorSelection: Record<string, string> = {};

        for (const user of selections) {
            const [connectionId, selection] = user;

            for (const layerId of selection) {
                layerIdsToColorSelection[layerId] =
                    connectionIdToColor(connectionId);
            }
        }

        return layerIdsToColorSelection;
    }, [selections]);
};
