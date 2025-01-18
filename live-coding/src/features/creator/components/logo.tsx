import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
    return (
        <Link href="/">
            <div className="flex items-center gap-x-4 transition hover:opacity-75">
                <div className="mr-12 shrink-0 rounded-full p-1 lg:mr-0 lg:shrink">
                    <Image
                        src="/logo.svg"
                        alt="Live Coding"
                        height={32}
                        width={32}
                    />
                </div>
                <div className={cn(poppins.className, "hidden lg:block")}>
                    <p className="text-lg font-semibold">Live Coding</p>
                    <p className="text-xs text-muted-foreground">
                        Creator dashboard
                    </p>
                </div>
            </div>
        </Link>
    );
};
