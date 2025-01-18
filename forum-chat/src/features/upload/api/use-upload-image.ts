import { useMutation } from "@tanstack/react-query";
import { ConvexError } from "convex/values";
import { Id } from "../../../../convex/_generated/dataModel";

interface UploadFileArgs {
    file: File;
    url: string;
}

interface UploadFileResponse {
    storageId: Id<"_storage">;
}

const uploadFile = async ({
    file,
    url,
}: UploadFileArgs): Promise<UploadFileResponse> => {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
    });

    if (!response.ok) {
        throw new Error("Failed to upload the file");
    }

    return response.json();
};

export const useUploadFile = () => {
    const mutation = useMutation<UploadFileResponse, Error, UploadFileArgs>({
        mutationFn: uploadFile,
        onError: () => {
            throw new ConvexError("Fail to upload message");
        },
    });

    return mutation;
};
