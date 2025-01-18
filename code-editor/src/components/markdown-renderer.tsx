import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { CopyButton } from "./copy-button";

type Props = {
    content: string;
};

export const MarkdownRenderer = ({ content }: Props) => {
    return (
        <Markdown
            className="prose prose-invert max-w-none"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
                pre({ node, children, ...props }: any) {
                    return (
                        <pre className="not-prose" {...props}>
                            {children}
                        </pre>
                    );
                },
                code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "");

                    const language = match ? match[1] : "plaintext";
                    const code = String(children).replace(/\n$/, "");

                    return !inline && match ? (
                        <div>
                            <div className="-mb-2 flex items-center justify-between rounded-t-md bg-[#ffffff08] px-4 py-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-400">
                                        {language || "plaintext"}
                                    </span>
                                </div>
                                <CopyButton
                                    value={code}
                                    className="bg-transparent ring-0 hover:bg-[#2a2a3a]"
                                />
                            </div>
                            <SyntaxHighlighter
                                style={dracula}
                                PreTag="div"
                                language={match[1]}
                                {...props}
                                customStyle={{
                                    borderRadius: "0 0 4px 4px",
                                }}
                            >
                                {code}
                            </SyntaxHighlighter>
                        </div>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {content}
        </Markdown>
    );
};
