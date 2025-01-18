import { Tools } from "@/components/tools";
import { NewButton } from "./new-buttont";
import { SideBarList } from "./sidebar-list";

export const Sidebar = () => {
    return (
        <aside className="fixed left-0 z-[1] flex h-full w-[60px] flex-col gap-y-4 bg-blue-950 p-3 text-white">
            <NewButton />
            <SideBarList />
            <Tools />
        </aside>
    );
};
