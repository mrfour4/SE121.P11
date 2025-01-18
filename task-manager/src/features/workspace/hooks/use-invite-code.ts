import { useParams } from "next/navigation";

export const useInviteCode = () => {
    const { inviteCode } = useParams<{ inviteCode: string }>();
    return inviteCode;
};
