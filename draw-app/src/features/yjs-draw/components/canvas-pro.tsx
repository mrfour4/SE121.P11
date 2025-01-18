"use client";

import "tldraw/tldraw.css";

import { useSelf } from "@liveblocks/react/suspense";
import { DefaultStylePanel, Tldraw } from "tldraw";

import { useYjsStore } from "../hooks/use-yjs-store";

import { Info } from "./info";
import { Participant } from "./participant";

import { useHideMark } from "../hooks/use-hide-mark";

type Props = {
    boardId: string;
};

export const CanvasPro = ({ boardId }: Props) => {
    const id = useSelf((me) => me.id);
    const info = useSelf((me) => me.info);

    const store = useYjsStore({
        user: { id, color: "#D583F0", name: info.name },
    });

    useHideMark();

    return (
        <div className="size-full touch-none bg-neutral-100">
            <Tldraw
                store={store}
                components={{
                    StylePanel: () => (
                        <div className="mt-1 flex-col gap-y-1">
                            <Participant />
                            <DefaultStylePanel />
                            <Info boardId={boardId} />
                        </div>
                    ),
                }}
                autoFocus
            />
        </div>
    );
};
