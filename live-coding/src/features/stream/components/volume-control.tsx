"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Hint } from "../../../components/hint";
import { Slider } from "../../../components/ui/slider";

type Props = {
    value: number;
    onToggle: () => void;
    onChange: (value: number) => void;
};

export const VolumeControl = ({ value, onChange, onToggle }: Props) => {
    const isMuted = value === 0;
    const isAboveHalf = value > 50;

    let Icon = Volume1;

    if (isMuted) {
        Icon = VolumeX;
    } else if (isAboveHalf) {
        Icon = Volume2;
    }

    const label = isMuted ? "Unmute" : "Mute";

    const onValueChange = (value: number[]) => {
        onChange(value[0]);
    };

    return (
        <div className="flex items-center gap-2">
            <Hint label={label} asChild>
                <button
                    onClick={onToggle}
                    className="rounded-lg p-1.5 text-white hover:bg-white/10"
                >
                    <Icon className="size-6" />
                </button>
            </Hint>
            <Slider
                className="w-32 cursor-pointer"
                onValueChange={onValueChange}
                value={[value]}
                max={100}
                step={1}
            />
        </div>
    );
};
