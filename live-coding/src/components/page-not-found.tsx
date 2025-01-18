import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
    message?: string;
};

export const PageNotFound = ({ message }: Props) => {
    return (
        <div className="flex h-full flex-col items-center justify-center space-y-4 text-muted-foreground">
            <h1 className="text-4xl">404</h1>
            <p>
                {message
                    ? message
                    : "We couldn't find the page you were looking for."}
            </p>
            <Button variant="secondary" asChild>
                <Link href="/">Go back home</Link>
            </Button>
        </div>
    );
};
