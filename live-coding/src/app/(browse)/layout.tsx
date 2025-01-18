import { Suspense } from "react";

import { Container } from "@/features/browse/components/container";
import { Navbar } from "@/features/browse/components/navbar";
import { Sidebar, SidebarSkeleton } from "@/features/browse/components/sidebar";

type Props = {
    children: React.ReactNode;
};

export default function BrowseLayout({ children }: Props) {
    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                <Suspense fallback={<SidebarSkeleton />}>
                    <Sidebar />
                </Suspense>
                <Container>{children}</Container>
            </div>
        </>
    );
}
