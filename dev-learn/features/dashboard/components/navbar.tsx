import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
    return (
        <div className="h-full p-4 flex items-center bg-white border-b shadow-sm">
            <MobileSidebar />
            <NavbarRoutes />
        </div>
    );
};
