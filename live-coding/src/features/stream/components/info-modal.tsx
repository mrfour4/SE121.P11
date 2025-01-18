"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { UploadDropzone } from "@/lib/uploadthing";

import { updateStream } from "@/actions/stream";
import { Hint } from "@/components/hint";
import { Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

type Props = {
    initialName: string;
    initialThumbnailUrl: string | null;
};

export const InfoModal = ({ initialName, initialThumbnailUrl }: Props) => {
    const [isPending, startTransition] = useTransition();
    const closeRef = useRef<HTMLButtonElement>(null);

    const router = useRouter();

    const [name, setName] = useState(initialName);
    const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        startTransition(() => {
            updateStream({ name })
                .then(() => {
                    closeRef.current?.click();
                    toast.success("Stream info updated");
                })
                .catch(() => {
                    toast.error("Failed to update stream info");
                });
        });
    };

    const onRemove = () => {
        startTransition(() => {
            updateStream({ thumbnailUrl: null })
                .then(() => {
                    setThumbnailUrl(null);
                    toast.success("Thumbnail removed");
                    closeRef.current?.click();
                })
                .catch(() => {
                    toast.error("Something went wrong");
                });
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit your stream info</DialogTitle>
                </DialogHeader>
                <form className="space-y-14" onSubmit={onSubmit}>
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            placeholder="Stream name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Thumbnail</Label>
                        {thumbnailUrl ? (
                            <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
                                <div className="absolute right-2 top-2 z-10">
                                    <Hint
                                        label="Remove thumbnail"
                                        side="left"
                                        asChild
                                    >
                                        <Button
                                            className="size-auto p-1.5"
                                            type="button"
                                            disabled={isPending}
                                            onClick={onRemove}
                                        >
                                            <Trash />
                                        </Button>
                                    </Hint>
                                </div>
                                <Image
                                    alt="Thumbnail"
                                    src={thumbnailUrl}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="rounded-xl border outline-dashed outline-muted">
                                <UploadDropzone
                                    endpoint="thumbnailUploader"
                                    appearance={{
                                        label: {
                                            color: "#fff",
                                        },
                                        allowedContent: {
                                            color: "#fff",
                                        },
                                    }}
                                    config={{
                                        mode: "auto",
                                    }}
                                    onClientUploadComplete={(res) => {
                                        setThumbnailUrl(res?.[0]?.url);
                                        router.refresh();
                                        closeRef.current?.click();
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <DialogClose asChild ref={closeRef}>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isPending || name.trim().length === 0}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
