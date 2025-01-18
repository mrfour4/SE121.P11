"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

type Props = {
    onChange: (url: string, name: string) => void;
    endpoint: keyof typeof ourFileRouter;
};

export const FileUpload = ({ onChange, endpoint }: Props) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                console.log("🚀 ~ onClientUploadComplete ~ res:", res);
                onChange(res[0].url, res[0].name);
            }}
            onUploadError={(error: Error) => {
                toast.error(error.message);
            }}
        />
    );
};
