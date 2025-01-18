"use client";

import { FormEvent, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";

import { Icons } from "@/components/icons";
import { MarkdownRenderer } from "@/components/markdown-renderer";

import { Loader, Send } from "lucide-react";
import { toast } from "sonner";

import { useCreateComment } from "../api/use-create-comment";
import { useSnippetId } from "../hooks/use-snippet-id";

export const CommentForm = () => {
    const snippetId = useSnippetId();

    const [value, setValue] = useState("");
    const [isPreview, setIsPreview] = useState(false);

    const { isPending, mutate } = useCreateComment();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isPending) return;

        mutate(
            { content: value, snippetId: snippetId as Id<"snippets"> },
            {
                onSuccess: () => {
                    toast.success("Comment posted successfully");
                    setValue("");
                },
            },
        );
    };

    return (
        <form
            onSubmit={onSubmit}
            className="relative space-y-2 overflow-hidden rounded-xl border border-[#ffffff0a] bg-[#1e1e2e]/50"
        >
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50}>
                    <Textarea
                        placeholder="Add to the discussion..."
                        className="max-h-[600px] min-h-[120px] border-none px-4"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={50}>
                    <div className="text-[#e1e1e3 max-h-[600px] min-h-[120px] overflow-auto p-6">
                        <MarkdownRenderer
                            content={value || "*Try some markdown...*"}
                        />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>

            <div className="flex items-center justify-between gap-4 border-t border-[#ffffff0a] bg-[#1e1e28] px-4 py-3">
                <div className="hidden space-y-1 text-xs text-[#808086] sm:block">
                    <Badge
                        className="border-none px-3 py-2 text-[#808086] hover:bg-[#2a2a3a] hover:text-white"
                        variant="outline"
                    >
                        <Icons.markdown className="size-4" />
                        <span>Markdown is supported</span>
                    </Badge>
                </div>

                <Button disabled={isPending}>
                    {isPending ? (
                        <>
                            <Loader className="animate-spin" />
                            <span>Posting...</span>
                        </>
                    ) : (
                        <>
                            <Send />
                            <span>Comment</span>
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
};
