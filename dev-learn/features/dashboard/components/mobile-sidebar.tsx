import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Menu } from "lucide-react";

import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white">
                <VisuallyHidden>
                    <SheetHeader>
                        <SheetTitle>LMS UIT</SheetTitle>
                        <SheetDescription>Course option</SheetDescription>
                    </SheetHeader>
                </VisuallyHidden>
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};
