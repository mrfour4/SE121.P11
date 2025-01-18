"use client";

import { LayerType, Side, XYWH } from "@/types";

import { memo } from "react";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useSelf, useStorage } from "@liveblocks/react/suspense";

const HANDLE_WIDTH = 8;

type Props = {
    onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
};

export const SelectionBox = memo(({ onResizeHandlePointerDown }: Props) => {
    const soleLayerId = useSelf((me) =>
        me.presence.selection.length === 1 ? me.presence.selection[0] : null,
    );

    const isShowingHandles = useStorage(
        (root) =>
            soleLayerId &&
            root.layers.get(soleLayerId)?.type !== LayerType.Path,
    );

    const bounds = useSelectionBounds();
    if (!bounds) {
        return null;
    }

    return (
        <>
            <rect
                className="pointer-events-none fill-transparent stroke-blue-600 stroke-1"
                style={{ transform: `translate(${bounds.x}px, ${bounds.y}px)` }}
                x={0}
                y={0}
                width={bounds.width}
                height={bounds.height}
            />

            {isShowingHandles && (
                <>
                    <rect
                        className="cursor-nwse-resize fill-white stroke-blue-600 stroke-1"
                        x={0}
                        y={0}
                        style={{
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(
                                Side.Top + Side.Left,
                                bounds,
                            );
                        }}
                    />
                    <rect
                        className="cursor-ns-resize fill-white stroke-blue-600 stroke-1"
                        x={0}
                        y={0}
                        style={{
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Top, bounds);
                        }}
                    />
                    <rect
                        className="cursor-nesw-resize fill-white stroke-blue-600 stroke-1"
                        x={0}
                        y={0}
                        style={{
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(
                                Side.Top + Side.Right,
                                bounds,
                            );
                        }}
                    />
                    <rect
                        className="cursor-ew-resize fill-white stroke-blue-600 stroke-1"
                        x={0}
                        y={0}
                        style={{
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Right, bounds);
                        }}
                    />
                    <rect
                        className="cursor-nwse-resize fill-white stroke-blue-600 stroke-1"
                        x={0}
                        y={0}
                        style={{
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(
                                Side.Bottom + Side.Right,
                                bounds,
                            );
                        }}
                    />
                    <rect
                        className="cursor-ns-resize fill-white stroke-blue-600 stroke-1"
                        x={0}
                        y={0}
                        style={{
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Bottom, bounds);
                        }}
                    />
                    <rect
                        className="cursor-nesw-resize fill-white stroke-blue-600 stroke-1"
                        x={0}
                        y={0}
                        style={{
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(
                                Side.Bottom + Side.Left,
                                bounds,
                            );
                        }}
                    />
                    <rect
                        className="cursor-ew-resize fill-white stroke-blue-600 stroke-1"
                        x={0}
                        y={0}
                        style={{
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`,
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onResizeHandlePointerDown(Side.Left, bounds);
                        }}
                    />
                </>
            )}
        </>
    );
});

SelectionBox.displayName = "SelectionBox";
