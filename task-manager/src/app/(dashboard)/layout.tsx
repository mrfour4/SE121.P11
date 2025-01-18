import { redirect } from "next/navigation";

import { Modals } from "@/components/modals";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

import { getCurrent } from "@/features/auth/queries/get-current";

type Props = {
    children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
    const user = await getCurrent();

    if (!user) {
        redirect("/sign-in");
    }
    return (
        <div className="min-h-screen">
            <Modals />
            <div className="flex size-full">
                <div className="fixed left-0 top-0 hidden h-full overflow-y-auto lg:block lg:w-[264px]">
                    <Sidebar />
                </div>
                <div className="w-full lg:pl-[264px]">
                    <div className="mx-auto h-full max-w-screen-2xl">
                        <Navbar />
                        <main className="flex h-full flex-col px-6 py-8 pt-[72px] lg:pt-24">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}
