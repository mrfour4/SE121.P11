"use client";

import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { LogIn, User } from "lucide-react";

export const ProfileButton = () => {
    return (
        <>
            <UserButton
                appearance={{
                    elements: {
                        avatarBox: "size-8",
                    },
                }}
            >
                <UserButton.MenuItems>
                    <UserButton.Link
                        label="Profile"
                        labelIcon={<User className="size-4" />}
                        href="/profile"
                    />
                </UserButton.MenuItems>
            </UserButton>

            <SignedOut>
                <SignInButton mode="modal">
                    <Button>
                        <LogIn />
                        Sign In
                    </Button>
                </SignInButton>
            </SignedOut>
        </>
    );
};
