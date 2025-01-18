import { useEffect } from "react";

import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { useHistory } from "@liveblocks/react/suspense";

export const useShortcuts = (history: ReturnType<typeof useHistory>) => {
    const deleteLayers = useDeleteLayers();

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Delete": {
                    deleteLayers();
                    break;
                }
                case "z": {
                    if (e.ctrlKey || e.metaKey) {
                        history.undo();
                    }
                    break;
                }
                case "y": {
                    if (e.ctrlKey || e.metaKey) {
                        history.redo();
                    }
                    break;
                }
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [deleteLayers, history]);
};
