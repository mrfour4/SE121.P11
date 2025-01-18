"use client";

import { Id } from "../../../../convex/_generated/dataModel";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Sidebar } from "@/components/sidebar";
import { Toolbar } from "@/components/toolbar";
import { Loader } from "lucide-react";

import { Profile } from "@/features/members/components/profile";
import { Thread } from "@/features/messages/components/thread";
import { WorkspaceSidebar } from "@/features/workspaces/components/workspace-sidebar";

import { usePanel } from "@/features/messages/hooks/use-panel";

type Props = {
    children: React.ReactNode;
};

const WorkspaceLayout = ({ children }: Props) => {
    const { parentMessageId, profileMemberId, onClose } = usePanel();

    const showPanel = !!parentMessageId || !!profileMemberId;

    return (
        <div className="h-full">
            <Toolbar />
            <div className="flex h-[calc(100vh-56px)]">
                <Sidebar />

                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={20} minSize={20}>
                        <WorkspaceSidebar />
                    </ResizablePanel>
                    <ResizableHandle withHandle />

                    <ResizablePanel
                        defaultSize={showPanel ? 50 : 80}
                        minSize={20}
                    >
                        {children}
                    </ResizablePanel>

                    {showPanel && (
                        <>
                            <ResizableHandle withHandle />
                            <ResizablePanel minSize={20} defaultSize={30}>
                                {parentMessageId ? (
                                    <Thread
                                        messageId={
                                            parentMessageId as Id<"messages">
                                        }
                                        onClose={onClose}
                                    />
                                ) : profileMemberId ? (
                                    <Profile
                                        memberId={
                                            profileMemberId as Id<"members">
                                        }
                                        onClose={onClose}
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center">
                                        <Loader className="size-5 animate-spin text-muted-foreground" />
                                    </div>
                                )}
                            </ResizablePanel>
                        </>
                    )}
                </ResizablePanelGroup>
            </div>
        </div>
    );
};

export default WorkspaceLayout;
