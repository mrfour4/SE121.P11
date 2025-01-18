import { ConnectModal } from "@/features/chat/components/connect-modal";
import { KeyCard } from "@/features/chat/components/key-card";
import { UrlCard } from "@/features/chat/components/url-card";

import { getSelf } from "@/features/auth/service/get-self";
import { getStreamByUserId } from "@/features/chat/service/get-stream";

export default async function KeysPage() {
    const self = await getSelf();
    const stream = await getStreamByUserId(self.id);

    if (!stream) {
        throw new Error("Stream not found");
    }

    return (
        <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Keys and URLs</h1>
                <ConnectModal />
            </div>
            <div className="space-y-4">
                <UrlCard value={stream.serverUrl} />
                <KeyCard value={stream.streamKey} />
            </div>
        </div>
    );
}
