import Link from "next/link";
import { Button } from "./ui/button";

import { TriangleAlert } from "lucide-react";

type Props = {
    message?: string;
};
export const PageError = ({ message = "Something went wrong" }: Props) => {
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-y-2">
            <TriangleAlert className="size-6 text-destructive" />
            <p className="text-sm text-destructive">{message}</p>
            <Button variant="secondary" size="sm" asChild>
                <Link href="/">Go back to home</Link>
            </Button>
        </div>
    );
};
