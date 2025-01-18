import Quill, { QuillOptions } from "quill";
import { Delta, Op } from "quill/core";
import "quill/dist/quill.snow.css";

import Image from "next/image";
import {
    MutableRefObject,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

import { EditorValues } from "@/types";

import { cn, isEmptyText } from "@/lib/utils";

import { ALargeSmall, ImageIcon, SendHorizonal, Smile, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { EmojiPopover } from "./emoji-popover";
import { Hint } from "./hint";

type Props = {
    variant?: "create" | "update";
    placeholder?: string;
    defaultValue?: Delta | Op[];
    disabled?: boolean;
    innerRef?: MutableRefObject<Quill | null>;
    onSubmit: ({ image, body }: EditorValues) => void;
    onCancel?: () => void;
};

const Editor = ({
    variant = "create",
    placeholder = "Write something...",
    defaultValue = [],
    disabled = false,
    innerRef,
    onSubmit,
    onCancel,
}: Props) => {
    const [text, setText] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [isToolbarVisible, setIsToolbarVisible] = useState(true);

    const containerRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    const submitRef = useRef(onSubmit);
    const placeholderRef = useRef(placeholder);
    const defaultValueRef = useRef(defaultValue);
    const disabledRef = useRef(disabled);
    const imageElementRef = useRef<HTMLInputElement>(null);

    useLayoutEffect(() => {
        submitRef.current = onSubmit;
        placeholderRef.current = placeholder;
        defaultValueRef.current = defaultValue;
        disabledRef.current = disabled;
    });

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        const editorContainer = container.appendChild(
            container.ownerDocument.createElement("div"),
        );

        const option: QuillOptions = {
            theme: "snow",
            placeholder: placeholderRef.current,
            modules: {
                toolbar: [
                    ["bold", "italic", "strike"],
                    ["link"],
                    [{ list: "ordered" }, { list: "bullet" }],
                ],
                keyboard: {
                    bindings: {
                        enter: {
                            key: "Enter",
                            handler: () => {
                                const text = quill.getText();
                                const addedImage =
                                    imageElementRef.current?.files?.[0] || null;

                                const isEmpty =
                                    !addedImage && isEmptyText(text);

                                if (isEmpty) return;

                                submitRef.current({
                                    image: addedImage,
                                    body: JSON.stringify(quill.getContents()),
                                });

                                return;
                            },
                        },
                        shift_enter: {
                            key: "Enter",
                            shiftKey: true,
                            handler: () => {
                                quill.insertText(
                                    quill.getSelection()?.index || 0,
                                    "\n",
                                );
                            },
                        },
                    },
                },
            },
        };

        const quill = new Quill(editorContainer, option);
        quillRef.current = quill;

        quillRef.current.focus();

        if (innerRef) {
            innerRef.current = quill;
        }

        quill.setContents(defaultValueRef.current);
        setText(quill.getText());

        quill.on(Quill.events.TEXT_CHANGE, () => {
            setText(quill.getText());
        });

        return () => {
            if (container) {
                container.innerHTML = "";
            }

            quill.off(Quill.events.TEXT_CHANGE);

            if (quillRef) {
                quillRef.current = null;
            }

            if (innerRef) {
                innerRef.current = null;
            }
        };
    }, [innerRef]);

    const toggleToolbar = () => {
        setIsToolbarVisible(!isToolbarVisible);
        const toolbarElement =
            containerRef.current?.querySelector(".ql-toolbar");

        if (toolbarElement) {
            toolbarElement.classList.toggle("hidden");
        }
    };

    const isEmpty = !image && isEmptyText(text);

    const onEmojiSelected = (value: string) => {
        const quill = quillRef.current;

        quill?.insertText(quill.getSelection()?.index || 0, value);
    };

    const onSend = () => {
        onSubmit({
            image: image ?? null,
            body: JSON.stringify(quillRef.current?.getContents()),
        });
    };

    return (
        <div className="flex flex-col">
            <input
                type="file"
                accept="image/*"
                ref={imageElementRef}
                onChange={(e) => {
                    if (e.target.files) {
                        setImage(e.target.files[0]);
                        e.target.blur();
                    }
                }}
                className="hidden"
            />

            <div
                className={cn(
                    "flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white transition focus-within:border-slate-300 focus-within:shadow-sm",
                    disabled && "opacity-50",
                )}
            >
                <div ref={containerRef} className="ql-custom h-full"></div>

                {!!image && (
                    <div className="p-2">
                        <div className="group/image relative flex size-[62px] items-center justify-center">
                            <button
                                onClick={() => {
                                    setImage(null);
                                    imageElementRef.current!.value = "";
                                }}
                                className="absolute -right-2.5 -top-2.5 z-[4] hidden size-6 items-center justify-center rounded-full border-2 border-white bg-muted-foreground/80 hover:bg-muted-foreground group-hover/image:flex"
                            >
                                <X className="size-3.5 text-muted" />
                            </button>

                            <Image
                                src={URL.createObjectURL(image)}
                                alt={image.name}
                                fill
                                className="overflow-hidden rounded-lg border object-cover"
                            />
                        </div>
                    </div>
                )}
                <div className="z-[5] flex px-2 pb-2">
                    <Hint
                        label={
                            isToolbarVisible
                                ? "Hide formatting"
                                : "Show formatting"
                        }
                    >
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            disabled={disabled}
                            onClick={toggleToolbar}
                        >
                            <ALargeSmall className="size-4" />
                        </Button>
                    </Hint>

                    <EmojiPopover onEmojiSelected={onEmojiSelected}>
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            disabled={disabled}
                        >
                            <Smile className="size-4" />
                        </Button>
                    </EmojiPopover>

                    {variant === "create" && (
                        <Hint label="Image">
                            <Button
                                size="icon-sm"
                                variant="ghost"
                                disabled={disabled}
                                onClick={() => imageElementRef.current?.click()}
                            >
                                <ImageIcon className="size-4" />
                            </Button>
                        </Hint>
                    )}

                    {variant === "create" && (
                        <Button
                            size="icon-sm"
                            disabled={disabled || isEmpty}
                            className={cn(
                                "ml-auto",
                                isEmpty
                                    ? "bg-muted text-muted-foreground hover:bg-muted"
                                    : "bg-[#007a5a] text-white hover:bg-[#007a5a]/80",
                            )}
                            onClick={onSend}
                        >
                            <SendHorizonal className="size-4" />
                        </Button>
                    )}

                    {variant === "update" && (
                        <div className="ml-auto flex items-center gap-x-2">
                            <Button
                                size="sm"
                                variant="outline"
                                disabled={disabled}
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>

                            <Button
                                size="sm"
                                variant="outline"
                                className="bg-[#007a5a] hover:bg-[#007a5a]/80"
                                disabled={disabled || isEmpty}
                                onClick={onSend}
                            >
                                <span className="text-white">Save</span>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div
                className={cn(
                    "flex justify-end p-2 text-[10px] text-muted-foreground opacity-0 transition",
                    !isEmpty && "opacity-100",
                )}
            >
                <p>
                    <strong>Shift + Enter</strong> to add new line
                </p>
            </div>
        </div>
    );
};

export default Editor;
