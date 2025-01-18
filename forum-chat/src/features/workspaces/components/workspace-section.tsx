import { Doc } from "../../../../convex/_generated/dataModel";

import { Accordion } from "@/components/ui/accordion";

import { Hash } from "lucide-react";

import { SidebarItem } from "@/components/sidebar-item";
import { UserItem } from "@/features/members/components/user-item";
import { SectionItem } from "./section-item";

import { useMemberId } from "@/features/members/hooks/use-member-id";
import { useModalStore } from "@/providers/modal-store-provider";

import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useChannelId } from "@/features/channels/hooks/use-channel-id";
import { useGetMembers } from "@/features/members/api/use-get-members";

type Props = {
    currentMember: Doc<"members">;
};

export const WorkspaceSection = ({ currentMember }: Props) => {
    const onOpen = useModalStore((state) => state.onOpen);

    const channelId = useChannelId();
    const memberId = useMemberId();

    const channels = useGetChannels();
    const members = useGetMembers();

    const onNewChannel =
        currentMember.role === "admin"
            ? () => onOpen("create-channel")
            : undefined;

    return (
        <Accordion type="multiple" defaultValue={["channels", "messages"]}>
            <SectionItem
                value="channels"
                label="Channels"
                hint="New channel"
                onNew={onNewChannel}
            >
                {channels.data?.map((channel) => (
                    <SidebarItem
                        key={channel._id}
                        id={channel._id}
                        label={channel.name}
                        Icon={Hash}
                        isActive={channelId === channel._id}
                    />
                ))}
            </SectionItem>

            <SectionItem
                value="messages"
                label="Direct Messages"
                hint="New direct message"
            >
                {members.data?.map((member) => (
                    <UserItem
                        key={member._id}
                        id={member._id}
                        label={member.user.name}
                        imageUrl={member.user.imageUrl}
                        isActive={member._id === memberId}
                    />
                ))}
            </SectionItem>
        </Accordion>
    );
};
