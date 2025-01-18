import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { UserButton } from "@/components/user-button";

import { getCurrent } from "@/features/auth/queries/get-current";

type Props = {
    children: React.ReactNode;
};

export default async function StandaloneLayout({ children }: Props) {
    const user = await getCurrent();

    if (!user) {
        redirect("/sign-in");
    }

    return (
        <main className="min-h-screen bg-neutral-100">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="relative h-14 w-[152px] object-cover"
                    >
                        <Image src="/logo.svg" alt="Logo" fill priority />
                    </Link>
                    <UserButton />
                </nav>
                <div className="flex flex-col items-center justify-center py-4">
                    {children}
                </div>
            </div>
        </main>
    );
}
