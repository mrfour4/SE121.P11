"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

type Props = {
    value: string;
};

export const Preview = ({ value }: Props) => {
    const ReactQuill = useMemo(
        () => dynamic(() => import("react-quill-new"), { ssr: false }),
        []
    );
    return <ReactQuill theme="bubble" value={value} readOnly />;
};
