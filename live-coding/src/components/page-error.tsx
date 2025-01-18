import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
    message?: string;
};

export const PageError = ({ message }: Props) => {
    return (
        <div className="flex h-full flex-col items-center justify-center space-y-4 text-muted-foreground">
            <p>Something went wrong. Please try again later.</p>
            <Button variant="secondary" asChild>
                <Link href="/">Go back home</Link>
            </Button>
        </div>
    );
};
