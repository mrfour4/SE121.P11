import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
    return (
        <aside className="h-full flex flex-col overflow-y-auto bg-white border-r shadow-sm">
            <div className="p-6 h-20 flex items-center">
                <Logo />
            </div>

            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </aside>
    );
};
