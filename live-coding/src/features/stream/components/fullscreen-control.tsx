import { Hint } from "@/components/hint";
import { Maximize, Minimize } from "lucide-react";

type Props = {
    isFullscreen: boolean;
    onToggle: () => void;
};

export const FullscreenControl = ({ isFullscreen, onToggle }: Props) => {
    const Icon = isFullscreen ? Minimize : Maximize;
    const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreen";

    return (
        <div className="flex items-center justify-center gap-4">
            <Hint label={label} asChild>
                <button
                    className="rounded-lg p-1.5 text-white hover:bg-white/10"
                    onClick={onToggle}
                >
                    <Icon className="size-5" />
                </button>
            </Hint>
        </div>
    );
};
