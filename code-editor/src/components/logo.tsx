import Link from "next/link";

import { Blocks } from "lucide-react";

export const Logo = () => {
    return (
        <Link href="/" className="group relative flex items-center gap-3">
            <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />
            <div className="relative rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 ring-1 ring-white/10 transition-all group-hover:ring-white/20">
                <Blocks className="size-6 -rotate-6 transform text-blue-400 transition-transform duration-500 group-hover:rotate-0" />
            </div>

            <div className="flex flex-col">
                <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 bg-clip-text text-lg font-semibold text-transparent">
                    LMS Code
                </span>
                <span className="block text-xs font-medium text-blue-400/60">
                    Interactive Code Editor
                </span>
            </div>
        </Link>
    );
};
