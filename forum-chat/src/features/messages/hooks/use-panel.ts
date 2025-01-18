import { useProfileMemberId } from "@/features/members/hooks/use-profile-member-id";
import { useParentMessageId } from "./use-parrent-id";

export const usePanel = () => {
    const [parentMessageId, setParentMessageId] = useParentMessageId();
    const [profileMemberId, setProfileMemberId] = useProfileMemberId();

    const onOpenProfile = (memberId: string) => {
        setProfileMemberId(memberId);
        setParentMessageId(null);
    };

    const onOpenMessage = (messageId: string) => {
        setParentMessageId(messageId);
        setProfileMemberId(null);
    };

    const onClose = () => {
        setParentMessageId(null);
        setProfileMemberId(null);
    };

    return {
        parentMessageId,
        profileMemberId,
        onOpenMessage,
        onOpenProfile,
        onClose,
    };
};
