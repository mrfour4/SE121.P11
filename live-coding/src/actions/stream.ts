"use server";

import { getSelf } from "@/features/auth/service/get-self";
import { db } from "@/lib/db";
import { Prisma, Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateStream = async (values: Partial<Stream>) => {
    const self = await getSelf();

    const selfStream = await db.stream.findUnique({
        where: { userId: self.id },
    });

    if (!selfStream) {
        throw new Error("Stream not found");
    }

    const validData: Prisma.StreamUpdateInput = {
        name: values.name,
        thumbnailUrl: values.thumbnailUrl,
        isChatEnabled: values.isChatEnabled,
        isChatDelayed: values.isChatDelayed,
        isChatFollowersOnly: values.isChatFollowersOnly,
    };

    const stream = await db.stream.update({
        where: { userId: self.id },
        data: {
            ...validData,
        },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return stream;
};
