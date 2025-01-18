import { CanvasMode, Color, Point } from "@/types";
import { useMutation } from "@liveblocks/react/suspense";

export const useStartDrawing = (lastUsedColor: Color) => {
    return useMutation(
        ({ setMyPresence }, point: Point, pressure: number) => {
            // console.log("startDrawing");

            setMyPresence({
                pencilDraft: [[point.x, point.y, pressure]],
                penColor: lastUsedColor,
            });
        },
        [lastUsedColor],
    );
};

export const useContinueDrawing = (mode: CanvasMode) => {
    return useMutation(
        ({ self, setMyPresence }, point: Point, e: React.PointerEvent) => {
            const { pencilDraft } = self.presence;

            if (mode !== CanvasMode.Pencil || pencilDraft === null) {
                return;
            }

            // console.log("continueDrawing");

            setMyPresence({
                cursor: point,
                pencilDraft:
                    pencilDraft.length === 1 &&
                    pencilDraft[0][0] === point.x &&
                    pencilDraft[0][1] === point.y
                        ? pencilDraft
                        : [...pencilDraft, [point.x, point.y, e.pressure]],
            });
        },
        [mode],
    );
};
