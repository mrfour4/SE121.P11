import { Color } from "@/types";
import { colorToCss } from "../lib/utils";

type Props = {
    color: Color;
    onClick: (color: Color) => void;
};

export const ColorButton = ({ color, onClick }: Props) => {
    return (
        <button
            className="flex size-8 items-center justify-center transition hover:opacity-75"
            onClick={() => onClick(color)}
        >
            <div
                className="size-8 rounded-md border border-neutral-300"
                style={{ background: colorToCss(color) }}
            />
        </button>
    );
};
