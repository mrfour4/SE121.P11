import { useOthersMapped } from "@liveblocks/react/suspense";

import { shallow } from "@liveblocks/client";
import { colorToCss } from "../lib/utils";

import { Path } from "./path";

export const Drafts = () => {
    const others = useOthersMapped(
        (other) => ({
            pencilDraft: other.presence.pencilDraft,
            penColor: other.presence.penColor,
        }),
        shallow,
    );

    return (
        <>
            {others.map(([key, other]) => {
                if (other.pencilDraft) {
                    return (
                        <Path
                            key={key}
                            x={0}
                            y={0}
                            points={other.pencilDraft}
                            fill={
                                other.penColor
                                    ? colorToCss(other.penColor)
                                    : "#000"
                            }
                        />
                    );
                }
                return null;
            })}
        </>
    );
};
