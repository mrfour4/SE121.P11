import { Color } from "@/types";
import { ColorButton } from "./color-button";

type Props = {
    onChange: (color: Color) => void;
};

export const ColorPicker = ({ onChange }: Props) => {
    return (
        <div className="mr-2 flex max-w-[164px] flex-wrap items-center gap-2 border-r border-neutral-200 pr-2">
            <ColorButton color={{ r: 243, g: 82, b: 35 }} onClick={onChange} />
            <ColorButton
                color={{ r: 255, g: 249, b: 177 }}
                onClick={onChange}
            />
            <ColorButton color={{ r: 68, g: 202, b: 99 }} onClick={onChange} />
            <ColorButton color={{ r: 39, g: 142, b: 237 }} onClick={onChange} />
            <ColorButton
                color={{ r: 155, g: 105, b: 245 }}
                onClick={onChange}
            />
            <ColorButton color={{ r: 252, g: 142, b: 42 }} onClick={onChange} />
            <ColorButton color={{ r: 0, g: 0, b: 0 }} onClick={onChange} />
            <ColorButton
                color={{ r: 255, g: 255, b: 255 }}
                onClick={onChange}
            />
        </div>
    );
};
