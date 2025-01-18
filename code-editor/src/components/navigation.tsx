import Link from "next/link";

import { Button } from "./ui/button";

import { Users } from "lucide-react";
import { Tools } from "./tools";

export const Navigation = () => {
    return (
        <nav className="flex items-center gap-x-4">
            <Button variant="outline" asChild>
                <Link
                    href="/snippets"
                    className="text-gray-300 hover:text-white"
                >
                    <Users />
                    <span>Community</span>
                </Link>
            </Button>
            <Tools />
        </nav>
    );
};
