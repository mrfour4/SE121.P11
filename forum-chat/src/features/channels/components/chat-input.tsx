"use client";

import { EditorValues } from "@/types";
import { ConvexError } from "convex/values";
import { Doc } from "../../../../convex/_generated/dataModel";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import Quill from "quill";
import { toast } from "sonner";

import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-url";
import { useUploadFile } from "@/features/upload/api/use-upload-image";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useChannelId } from "../hooks/use-channel-id";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

type CreateMessage = Pick<
    Doc<"messages">,
    "channelId" | "workspaceId" | "body" | "image"
>;

type Props = {
    placeholder: string;
};

export const ChatInput = ({ placeholder }: Props) => {
    const editorRef = useRef<Quill>(null);
    const [isPending, setIsPending] = useState(false);

    //  To reset state of editor
    const [editorKey, setEditorKey] = useState(0);

    const workspaceId = useWorkspaceId();
    const channelId = useChannelId();

    const createMessage = useCreateMessage();
    const generateUrl = useGenerateUploadUrl();
    const uploadImage = useUploadFile();

    const onSubmit = async ({ body, image }: EditorValues) => {
        try {
            setIsPending(true);
            editorRef.current?.enable(false);

            const message: CreateMessage = {
                body,
                channelId,
                workspaceId,
                image: undefined,
            };

            if (image) {
                const url = await generateUrl.mutateAsync({});
                const { storageId } = await uploadImage.mutateAsync({
                    file: image,
                    url,
                });

                message.image = storageId;
            }

            await createMessage.mutateAsync(message);

            setEditorKey((prev) => prev + 1);
        } catch (error) {
            const errorMessage =
                error instanceof ConvexError
                    ? error.message
                    : "Unexpected error occurred";

            toast.error(errorMessage);
        } finally {
            setIsPending(false);
            editorRef.current?.enable(true);
        }
    };

    return (
        <div className="w-full px-5">
            <Editor
                key={editorKey}
                variant="create"
                placeholder={placeholder}
                onSubmit={onSubmit}
                disabled={isPending}
                innerRef={editorRef}
            />
        </div>
    );
};
