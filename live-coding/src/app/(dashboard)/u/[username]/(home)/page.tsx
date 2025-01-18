import { StreamPlayer } from "@/features/stream/components/stream-player";
import { getUserByUsername } from "@/features/username/service/get-user-by-username";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
    params: {
        username: string;
    };
};

export default async function CreatorPage({ params }: Props) {
    const { username } = params;

    const externalUser = await currentUser();
    const user = await getUserByUsername(username);

    if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
        throw new Error("Unauthorized");
    }
    return (
        <div className="h-full">
            <StreamPlayer user={user} stream={user.stream} isFollowing={true} />
        </div>
    );
}
