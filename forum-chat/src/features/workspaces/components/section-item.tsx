import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

import { Hint } from "@/components/hint";

type Props = {
    value: string;
    label: string;
    hint: string;
    onNew?: () => void;
    children: React.ReactNode;
};

export const SectionItem = ({ value, label, hint, children, onNew }: Props) => {
    return (
        <AccordionItem value={value} className="border-b-0 px-2">
            <div className="group flex items-center justify-between px-3.5">
                <AccordionTrigger className="w-full justify-start py-2.5 text-gray-0/80 hover:no-underline">
                    <span className="ml-2 line-clamp-1 text-sm font-normal capitalize">
                        {label}
                    </span>
                </AccordionTrigger>

                {onNew && (
                    <Hint label={hint}>
                        <Button
                            variant="transparent"
                            size="icon-sm"
                            className="ml-auto size-6 shrink-0 p-0.5 text-sm opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={onNew}
                        >
                            <Plus className="size-5 text-gray-0/80" />
                        </Button>
                    </Hint>
                )}
            </div>
            <AccordionContent className="space-y-2 pb-2">
                {children}
            </AccordionContent>
        </AccordionItem>
    );
};
