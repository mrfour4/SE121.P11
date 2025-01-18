"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { Prisma, User } from "@prisma/client";

import { getSelf } from "@/features/auth/service/get-self";

export const updateUser = async (values: Partial<User>) => {
    const self = await getSelf();

    const validData: Prisma.UserUpdateInput = {
        bio: values.bio,
    };

    const user = await db.user.update({
        where: { id: self.id },
        data: { ...validData },
    });

    revalidatePath(`/${self.username}`);
    revalidatePath(`/u/${self.username}`);

    return user;
};
