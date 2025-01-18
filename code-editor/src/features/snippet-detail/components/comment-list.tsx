"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

import { Comment } from "./comment";
import { CommentForm } from "./comment-form";

import { useCurrentUser } from "@/hooks/use-current-user";
import { SignInButton } from "@clerk/nextjs";
import { useGetComments } from "../api/use-get-comments";
import { useSnippetId } from "../hooks/use-snippet-id";

export const CommentList = () => {
    const snippetId = useSnippetId();

    const { user } = useCurrentUser();
    const comments = useGetComments(snippetId);

    const isPending = comments.isPending;

    return (
        <div className="overflow-hidden rounded-xl border border-[#313244] bg-[#1e1e2e]/50">
            <div className="border-b border-[#313244]/50 px-6 py-6 sm:px-8">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                    <MessageSquare className="h-5 w-5" />
                    Discussion ({comments.data?.length || 0})
                </h2>
            </div>

            <div className="space-y-8 p-6 sm:p-8">
                {user ? (
                    <CommentForm />
                ) : (
                    <div className="space-y-4 rounded-xl border border-[#ffffff0a] bg-[#1e1e2e] p-6 text-center text-[#808086]">
                        <p className="">Sign in to join the discussion</p>
                        <SignInButton mode="modal">
                            <Button>Sign In</Button>
                        </SignInButton>
                    </div>
                )}

                <div className="space-y-6">
                    {comments.data?.map((comment) => (
                        <Comment key={comment._id} comment={comment} />
                    ))}
                </div>
            </div>
        </div>
    );
};
