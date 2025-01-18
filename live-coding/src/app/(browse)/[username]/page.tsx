import { notFound } from "next/navigation";

import { isBlockedByUser } from "@/features/username/service/check-blocked";
import { isFollowingUser } from "@/features/username/service/check-following";

import { StreamPlayer } from "@/features/stream/components/stream-player";
import { getUserByUsername } from "@/features/username/service/get-user-by-username";

type Props = {
    params: {
        username: string;
    };
};

export default async function UserPage({ params }: Props) {
    const { username } = params;
    const user = await getUserByUsername(username);

    if (!user || !user.username) {
        return notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    if (isBlocked) {
        return notFound();
    }

    return (
        <StreamPlayer
            user={user}
            stream={user.stream!}
            isFollowing={isFollowing}
        />
    );
}
