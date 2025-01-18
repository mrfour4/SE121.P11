import {
    ClerkLoaded,
    ClerkLoading,
    SignedIn,
    UserButton as UserButtonPrimitive,
} from "@clerk/nextjs";

import { Loader } from "lucide-react";

export const UserButton = () => {
    return (
        <>
            <ClerkLoading>
                <Loader className="size-10 animate-spin text-accent" />
            </ClerkLoading>
            <ClerkLoaded>
                <SignedIn>
                    <UserButtonPrimitive
                        appearance={{
                            elements: { avatarBox: "size-10" },
                        }}
                    />
                </SignedIn>
            </ClerkLoaded>
        </>
    );
};
