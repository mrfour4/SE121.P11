import { useParams } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";

export const useMemberId = () => {
    const { memberId } = useParams<{ memberId: Id<"members"> }>();

    return memberId;
};
