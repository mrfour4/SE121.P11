import Image from "next/image";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
    url?: string | null;
};

export const Thumbnail = ({ url }: Props) => {
    if (!url) return;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="relative overflow-hidden max-w-[360px] border rounded-lg cursor-zoom-in">
                    <Image
                        src={url}
                        alt="Message image"
                        width={360}
                        height={360}
                        className="size-full rounded-md object-contain"
                    />
                </div>
            </DialogTrigger>

            <DialogContent className="max-w-[800px] max-h-[90vh] p-0 w-auto bg-transparent border-none">
                <DialogHeader>
                    <DialogTitle className="sr-only">Image zoom in</DialogTitle>
                    <DialogDescription className="sr-only">
                        Image servers.
                    </DialogDescription>
                </DialogHeader>

                <Image
                    src={url}
                    alt="Message image"
                    quality={100}
                    width={360}
                    height={360}
                    className="rounded-md object-contain w-auto"
                />
            </DialogContent>
        </Dialog>
    );
};
