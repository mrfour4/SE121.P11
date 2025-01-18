import { LANGUAGES } from "@/features/dashboard/constants";
import { Language } from "@/types";
import Image from "next/image";

import { CopyButton } from "@/components/copy-button";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type Props = {
    code: string;
    language: string;
};

export const CodeBlock = ({ code, language }: Props) => {
    const trimmedCode = code
        .split("\n")
        .map((line) => line.trimEnd())
        .join("\n");

    return (
        <div className="my-4 overflow-hidden rounded-lg border border-[#ffffff0a] bg-[#0a0a0f]">
            <div className="flex items-center justify-between bg-[#ffffff08] px-4 py-2">
                <div className="flex items-center gap-2">
                    <Image
                        src={LANGUAGES[language as Language]?.logo}
                        alt={language}
                        width={20}
                        height={20}
                        className="size-4 object-contain"
                    />
                    <span className="text-sm text-gray-400">
                        {language || "plaintext"}
                    </span>
                </div>
                <CopyButton
                    value={trimmedCode}
                    className="border-none bg-transparent ring-0"
                />
            </div>

            <div className="relative">
                <SyntaxHighlighter
                    language={language || "plaintext"}
                    style={oneDark}
                    showLineNumbers={true}
                    wrapLines={true}
                    customStyle={{
                        backgroundColor: "transparent",
                        padding: "1rem",
                        margin: 0,
                    }}
                    codeTagProps={{
                        style: {
                            backgroundColor: "transparent",
                        },
                    }}
                >
                    {trimmedCode}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};
