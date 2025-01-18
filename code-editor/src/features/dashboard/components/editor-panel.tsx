"use client";

import { LANGUAGES } from "../constants";
import { CODE_EXAMPLES } from "../constants/code-example";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

import { CodeEditor } from "@/components/editor";
import { RunButton } from "./run-button";

import { useEditor } from "@/hooks/use-editor";
import { getDraftCode } from "../lib/utils";

import { useExecuteCode } from "../api/use-execute-code";
import { useGetLastExecution } from "../api/use-get-execute";
import { useSaveExecution } from "../api/use-save-execution";

export const EditorPanel = () => {
    const {
        config: { theme, language },
    } = useEditor();

    const [value, setValue] = useState<string | undefined>("");

    const execute = useExecuteCode();
    const save = useSaveExecution();

    const { data, isPending: isLoading } = useGetLastExecution();

    const defaultCode = CODE_EXAMPLES[language];

    useEffect(() => {
        if (isLoading) return;

        const draftCode = getDraftCode();

        if (draftCode?.language === language) {
            setValue(draftCode.code);
        } else if (data?.language === language) {
            setValue(data.code);
        } else {
            setValue(CODE_EXAMPLES[language]);
        }
    }, [data, isLoading, language]);

    const onReset = () => {
        setValue(defaultCode);
    };

    const onExecute = async () => {
        if (!value) return;

        const data = await execute.mutateAsync({ language, code: value });
        save.mutate({
            code: value,
            language,
            error: data.stderr,
            output: data.stdout,
        });
    };

    const isPending = execute.isPending || save.isPending;

    return (
        <div className="rounded-xl border border-white/[0.05] bg-[#12121a]/90 p-6 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
                        <Image
                            src={LANGUAGES[language].logo}
                            alt={language}
                            width={32}
                            height={32}
                        />
                    </div>
                    <div>
                        <h2 className="text-sm font-medium text-white">
                            Code Editor
                        </h2>
                        <p className="text-xs text-gray-500">
                            Write and execute your code
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="border-none text-gray-300 hover:bg-[#2a2a3a]"
                        onClick={onReset}
                    >
                        <RotateCcw />
                    </Button>
                    <RunButton disabled={isPending} onClick={onExecute} />
                </div>
            </div>
            <div className="h-[600px]">
                <CodeEditor
                    value={value}
                    onChange={setValue}
                    theme={theme}
                    language={language}
                />
            </div>
        </div>
    );
};
