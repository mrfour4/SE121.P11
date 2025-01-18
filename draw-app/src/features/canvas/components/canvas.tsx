"use client";

import {
    Camera,
    CanvasMode,
    CanvasState,
    Color,
    Point,
    Side,
    XYWH,
} from "@/types";

import { useCallback, useState } from "react";

import {
    useCanRedo,
    useCanUndo,
    useHistory,
    useMutation,
    useSelf,
    useStorage,
} from "@liveblocks/react/suspense";

import { useContinueDrawing, useStartDrawing } from "../actions/drawing";
import { useInsertLayer } from "../actions/insert-layer";
import { useInsertPath } from "../actions/insert-path";
import { useLayerIdsToColorSelection } from "../actions/layer-to-color";
import { useResizeSelectedLayer } from "../actions/resize-selected-layer";
import { useShortcuts } from "../actions/shortcuts";
import { useTranslateSelectedLayer } from "../actions/translate-selected-layer";
import { useUpdateSelectionNet } from "../actions/update-selection-net";

import { CursorsPresence } from "./cursors-presence";
import { Info } from "./info";
import { LayerPreview } from "./layer-preview";
import { Participant } from "./participant";
import { Path } from "./path";
import { SelectionBox } from "./selection-box";
import { SelectionTool } from "./selection-tool";
import { Toolbar } from "./toolbar";

import { useDisableScrollBounce } from "@/hooks/use-disable-scroll-bounce";
import { colorToCss, pointerEventToCanvasPoint } from "../lib/utils";

type Props = {
    boardId: string;
};

export const Canvas = ({ boardId }: Props) => {
    const layerIds = useStorage((root) => root.layerIds);
    const pencilDraft = useSelf((me) => me.presence.pencilDraft);

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 59,
        g: 130,
        b: 246,
    });

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    useDisableScrollBounce();
    useShortcuts(history);

    const insertLayer = useInsertLayer({ lastUsedColor, setCanvasState });

    const resizeSelectedLayer = useResizeSelectedLayer(canvasState);

    const translateSelectedLayers = useTranslateSelectedLayer({
        canvasState,
        setCanvasState,
    });

    const startMultiSelection = useCallback((current: Point, origin: Point) => {
        if (
            Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) >
            5
        ) {
            setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });
        }
    }, []);

    const updateSelectionNet = useUpdateSelectionNet({
        layerIds,
        setCanvasState,
    });

    const unselectLayers = useMutation(({ self, setMyPresence }) => {
        if (self.presence.selection.length > 0) {
            setMyPresence({ selection: [] }, { addToHistory: true });
        }
    }, []);

    const startDrawing = useStartDrawing(lastUsedColor);

    const continueDrawing = useContinueDrawing(canvasState.mode);

    const insertPath = useInsertPath({ lastUsedColor, setCanvasState });

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY,
        }));
    }, []);

    const onPointerDown = useCallback(
        (e: React.PointerEvent) => {
            const point = pointerEventToCanvasPoint(e, camera);

            if (canvasState.mode === CanvasMode.Inserting) {
                return;
            }

            if (canvasState.mode === CanvasMode.Pencil) {
                startDrawing(point, e.pressure);
                return;
            }

            setCanvasState({ mode: CanvasMode.Pressing, origin: point });
        },
        [camera, canvasState.mode, startDrawing],
    );

    const onPointerMove = useMutation(
        ({ setMyPresence }, e: React.PointerEvent) => {
            e.preventDefault();

            const current = pointerEventToCanvasPoint(e, camera);
            if (canvasState.mode === CanvasMode.Pressing) {
                startMultiSelection(current, canvasState.origin);
            } else if (canvasState.mode === CanvasMode.SelectionNet) {
                updateSelectionNet(current, canvasState.origin);
            } else if (canvasState.mode === CanvasMode.Translating) {
                translateSelectedLayers(current);
            } else if (canvasState.mode === CanvasMode.Resizing) {
                resizeSelectedLayer(current);
            } else if (canvasState.mode === CanvasMode.Pencil) {
                continueDrawing(current, e);
            }

            setMyPresence({ cursor: current });
        },
        [
            camera,
            canvasState,
            resizeSelectedLayer,
            translateSelectedLayers,
            startMultiSelection,
            updateSelectionNet,
            continueDrawing,
        ],
    );

    const onPointerUp = useMutation(
        ({}, e) => {
            const point = pointerEventToCanvasPoint(e, camera);

            if (
                canvasState.mode === CanvasMode.None ||
                canvasState.mode === CanvasMode.Pressing
            ) {
                unselectLayers();
                setCanvasState({ mode: CanvasMode.None });
            } else if (canvasState.mode === CanvasMode.Pencil) {
                insertPath();
            } else if (canvasState.mode === CanvasMode.Inserting) {
                insertLayer(canvasState.layerType, point);
            } else {
                setCanvasState({ mode: CanvasMode.None });
            }

            history.resume();
        },
        [camera, canvasState, insertLayer, history, unselectLayers, insertPath],
    );

    const onPointerLeave = useMutation(
        ({ setMyPresence }) => setMyPresence({ cursor: null }),
        [],
    );

    const layerIdsToColorSelection = useLayerIdsToColorSelection();

    const onLayerPointerDown = useMutation(
        ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
            if (
                canvasState.mode === CanvasMode.Pencil ||
                canvasState.mode === CanvasMode.Inserting
            ) {
                return;
            }

            history.pause();
            e.stopPropagation();

            const point = pointerEventToCanvasPoint(e, camera);
            if (!self.presence.selection.includes(layerId)) {
                setMyPresence({ selection: [layerId] }, { addToHistory: true });
            }
            setCanvasState({ mode: CanvasMode.Translating, current: point });
        },
        [camera, canvasState.mode, history],
    );

    const onResizeHandlePointerDown = useCallback(
        (corner: Side, initialBounds: XYWH) => {
            history.pause();
            setCanvasState({
                mode: CanvasMode.Resizing,
                initialBounds,
                corner,
            });
        },
        [history],
    );

    return (
        <main className="relative size-full touch-none bg-neutral-100">
            <Info boardId={boardId} />
            <Participant />
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                canUndo={canUndo}
                canRedo={canRedo}
                undo={history.undo}
                redo={history.redo}
            />
            <SelectionTool
                camera={camera}
                setLastUsedColor={setLastUsedColor}
            />
            <svg
                className="h-screen w-screen"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerLeave}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px)`,
                    }}
                >
                    {layerIds?.map((layerId) => (
                        <LayerPreview
                            key={layerId}
                            id={layerId}
                            onLayerPointerDown={onLayerPointerDown}
                            selectionColor={layerIdsToColorSelection[layerId]}
                        />
                    ))}
                    <SelectionBox
                        onResizeHandlePointerDown={onResizeHandlePointerDown}
                    />
                    {canvasState.mode === CanvasMode.SelectionNet &&
                        canvasState.current && (
                            <rect
                                className="fill-blue-500/5 stroke-blue-500 stroke-1"
                                x={Math.min(
                                    canvasState.origin.x,
                                    canvasState.current.x,
                                )}
                                y={Math.min(
                                    canvasState.origin.y,
                                    canvasState.current.y,
                                )}
                                width={Math.abs(
                                    canvasState.origin.x -
                                        canvasState.current.x,
                                )}
                                height={Math.abs(
                                    canvasState.origin.y -
                                        canvasState.current.y,
                                )}
                            />
                        )}
                    <CursorsPresence />
                    {pencilDraft != null && pencilDraft.length > 0 && (
                        <Path
                            points={pencilDraft}
                            fill={colorToCss(lastUsedColor)}
                            x={0}
                            y={0}
                        />
                    )}
                </g>
            </svg>
        </main>
    );
};
