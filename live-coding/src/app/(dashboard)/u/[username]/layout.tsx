import { redirect } from "next/navigation";

import { Container } from "@/features/creator/components/container";
import { Navbar } from "@/features/creator/components/navbar";
import { Sidebar } from "@/features/creator/components/sidebar";

import { getSelfByUsername } from "@/features/auth/service/get-self-by-username";

type Props = {
    children: React.ReactNode;
    params: { username: string };
};

export default async function CreatorLayout({ children, params }: Props) {
    const { username } = params;

    const self = await getSelfByUsername(username);

    if (!self) {
        redirect("/");
    }
    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                <Sidebar />
                <Container>{children}</Container>
            </div>
        </>
    );
}
