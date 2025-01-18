import { Poppins } from "next/font/google";
import Image from "next/image";

import { cn } from "@/lib/utils";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="rounded-full p-1">
                <Image
                    src="/logo.svg"
                    alt="Live Coding"
                    height="80"
                    width="80"
                />
            </div>
            <div
                className={cn("flex flex-col items-center", poppins.className)}
            >
                <p className="text-xl font-semibold">Live Coding</p>
                <p className="text-sm text-muted-foreground">
                    Let&apos;s code together
                </p>
            </div>
        </div>
    );
};
