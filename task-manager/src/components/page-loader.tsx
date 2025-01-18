import { Loader } from "lucide-react";

export const PageLoader = () => {
    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
    );
};
