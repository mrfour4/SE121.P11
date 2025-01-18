"use client";

import { memo } from "react";

import { Cursors } from "./cursors";
import { Drafts } from "./drafts";

export const CursorsPresence = memo(() => {
    return (
        <>
            <Cursors />
            <Drafts />
        </>
    );
});

CursorsPresence.displayName = "CursorsPresence";
