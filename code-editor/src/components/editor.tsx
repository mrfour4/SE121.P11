"use client";

import { Language, Theme } from "@/types";

import { Editor } from "@monaco-editor/react";
import { Skeleton } from "./ui/skeleton";

import {
    defineMonacoThemes,
    setDraftCode,
} from "@/features/dashboard/lib/utils";

import { useClerk } from "@clerk/nextjs";

type Props = {
    theme: Theme;
    language: Language;
    value?: string;
    onChange?: (value?: string) => void;
    readonly?: boolean;
};

export const CodeEditor = ({
    theme,
    readonly = false,
    language,
    value,
    onChange,
}: Props) => {
    // Monaco Editor causes ClerkJS to fail loading
    // https://github.com/clerk/javascript/issues/1643
    const clerk = useClerk();

    if (!clerk.loaded) {
        return null;
    }

    const handleChange = (value?: string) => {
        if (!onChange) return;

        onChange(value);
        setDraftCode({ language, code: value });
    };

    return (
        <Editor
            language={language}
            theme={theme}
            value={value}
            onChange={handleChange}
            beforeMount={defineMonacoThemes}
            options={{
                readOnly: readonly,
                fontSize: 15,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                renderLineHighlight: "none",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                scrollbar: {
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8,
                },
            }}
            loading={<CodeEditorSkeleton />}
        />
    );
};

export function CodeEditorSkeleton() {
    const randomWidth = [
        55.7343026667923, 44.435357063436584, 49.529229787939286,
        44.209650390761304, 26.062235927734626, 44.61867398432197,
        38.38129457261948, 29.07932763509362, 59.14535864721991,
        52.27163814110361, 24.300076279559676, 71.26114312669775,
        44.39327212955446, 60.504783051090676, 36.70947203994367,
        33.824239858932366, 51.36349179915079, 67.31670878876955,
    ];
    return (
        <div className="size-full overflow-hidden rounded-xl border border-white/[0.05] bg-[#12121a]/90 p-6 backdrop-blur">
            <div className="overflow-hidden rounded-xl ring-1 ring-white/[0.05]">
                <div className="bg-[#1e1e2e]/50 p-4 backdrop-blur-sm">
                    {randomWidth.map((width, i) => (
                        <div key={i} className="mb-3 flex items-center gap-4">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton
                                className="h-4"
                                style={{
                                    width: `${width}%`,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
