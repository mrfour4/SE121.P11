import { Color, Layer, Point } from "@/types";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";

declare global {
    interface Liveblocks {
        Presence: {
            cursor: Point | null;
            selection: string[];
            pencilDraft: [x: number, y: number, pressure: number][] | null;
            penColor: Color | null;
            presence: any;
        };

        Storage: {
            layers: LiveMap<string, LiveObject<Layer>>;
            layerIds: LiveList<string>;
            records: LiveMap<string, any>;
        };

        UserMeta: {
            id: string;
            info: {
                name: string;
                picture: string;
            };
        };

        RoomEvent: {};

        ThreadMetadata: {};

        RoomInfo: {};
    }
}

export {};
