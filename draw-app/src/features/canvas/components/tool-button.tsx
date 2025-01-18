import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

import { LucideIcon } from "lucide-react";

type Props = {
    label: string;
    icon: LucideIcon;
    isActive?: boolean;
    disabled?: boolean;
    onClick: () => void;
};

export const ToolButton = ({
    label,
    icon: Icon,
    isActive = false,
    disabled = false,
    onClick,
}: Props) => {
    return (
        <Hint label={label} side="right" sideOffset={14}>
            <Button
                disabled={disabled}
                size="icon"
                variant={isActive ? "boardActive" : "board"}
                onClick={onClick}
            >
                <Icon />
            </Button>
        </Hint>
    );
};
