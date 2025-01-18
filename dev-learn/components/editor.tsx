"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css";

type Props = {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
};

export const Editor = ({ value, placeholder, onChange }: Props) => {
    const ReactQuill = useMemo(
        () => dynamic(() => import("react-quill-new"), { ssr: false }),
        []
    );

    return (
        <div className="bg-white">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
};
