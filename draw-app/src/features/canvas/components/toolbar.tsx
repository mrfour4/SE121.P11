import { Skeleton } from "@/components/ui/skeleton";

import { CanvasMode, CanvasState, LayerType } from "@/types";
import {
    Circle,
    MousePointer2,
    Pencil,
    Redo2,
    Square,
    StickyNote,
    Type,
    Undo2,
} from "lucide-react";
import { ToolButton } from "./tool-button";

type Props = {
    canvasState: CanvasState;
    setCanvasState: (state: CanvasState) => void;
    canUndo: boolean;
    canRedo: boolean;
    undo: () => void;
    redo: () => void;
};

export const Toolbar = ({
    canvasState,
    setCanvasState,
    canUndo,
    canRedo,
    undo,
    redo,
}: Props) => {
    return (
        <div className="absolute left-2 top-1/2 flex -translate-y-1/2 flex-col gap-y-4">
            <div className="flex flex-col items-center gap-y-1 rounded-md bg-white p-1.5 shadow-md">
                <ToolButton
                    label="Select"
                    icon={MousePointer2}
                    isActive={
                        canvasState.mode === CanvasMode.None ||
                        canvasState.mode === CanvasMode.Translating ||
                        canvasState.mode === CanvasMode.SelectionNet ||
                        canvasState.mode === CanvasMode.Pressing ||
                        canvasState.mode === CanvasMode.Resizing
                    }
                    onClick={() => setCanvasState({ mode: CanvasMode.None })}
                />
                <ToolButton
                    label="Text"
                    icon={Type}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Text
                    }
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Text,
                        })
                    }
                />
                <ToolButton
                    label="Sticky note"
                    icon={StickyNote}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Note
                    }
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Note,
                        })
                    }
                />
                <ToolButton
                    label="Rectangle"
                    icon={Square}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Rectangle
                    }
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Rectangle,
                        })
                    }
                />
                <ToolButton
                    label="Ellipse"
                    icon={Circle}
                    isActive={
                        canvasState.mode === CanvasMode.Inserting &&
                        canvasState.layerType === LayerType.Ellipse
                    }
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Ellipse,
                        })
                    }
                />
                <ToolButton
                    label="Pen"
                    icon={Pencil}
                    isActive={canvasState.mode === CanvasMode.Pencil}
                    onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
                />
            </div>
            <div className="flex flex-col items-center gap-y-1 rounded-md bg-white p-1.5 shadow-md">
                <ToolButton
                    label="Undo"
                    icon={Undo2}
                    onClick={undo}
                    disabled={!canUndo}
                />
                <ToolButton
                    label="Redo"
                    icon={Redo2}
                    onClick={redo}
                    disabled={!canRedo}
                />
            </div>
        </div>
    );
};

export const ToolbarSkeleton = () => {
    return (
        <div className="absolute left-2 top-[50%] flex -translate-y-[50%] animate-pulse flex-col gap-y-4">
            <div className="flex flex-col items-center gap-y-1 rounded-md bg-white p-1.5 shadow-md">
                {...Array(6)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton key={index} className="h-10 w-10" />
                    ))}
            </div>
            <div className="flex flex-col items-center gap-y-1 rounded-md bg-white p-1.5 shadow-md">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
            </div>
        </div>
    );
};
