import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";

import { ConvexError } from "convex/values";

export const useGenerateUploadUrl = () => {
    const mutation = useMutation({
        mutationFn: useConvexMutation(api.upload.generateUploadUrl),
        onError: () => {
            throw new ConvexError("Fail to generate url");
        },
    });

    return mutation;
};
