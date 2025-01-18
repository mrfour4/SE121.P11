"use client";

import { useRouter } from "next/navigation";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Loader } from "lucide-react";
import { RiAddCircleFill } from "react-icons/ri";

import { WorkspaceAvatar } from "./workspace-avatar";

import { useGetWorkspaces } from "../api/use-get-workspaces";
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";
import { useWorkspaceId } from "../hooks/use-workspace-id";

export const WorkspaceSwitcher = () => {
    const { data: workspaces, isLoading } = useGetWorkspaces();
    const { open } = useCreateWorkspaceModal();

    const router = useRouter();
    const workspaceId = useWorkspaceId();

    const onSelect = (workspaceId: string) => {
        router.push(`/workspaces/${workspaceId}`);
    };

    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase text-neutral-500">
                    Workspaces
                </p>
                <RiAddCircleFill
                    onClick={open}
                    className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75"
                />
            </div>

            <Select
                onValueChange={onSelect}
                disabled={isLoading}
                value={isLoading ? undefined : workspaceId}
            >
                <SelectTrigger className="w-full bg-neutral-200 p-1 font-medium focus:ring-transparent">
                    {isLoading && (
                        <Loader className="-mr-8 ml-1 size-4 animate-spin" />
                    )}
                    <SelectValue placeholder="Loading workspace..." />
                </SelectTrigger>
                <SelectContent>
                    {workspaces?.documents.map((workspace) => (
                        <SelectItem key={workspace.$id} value={workspace.$id}>
                            <div className="flex items-center justify-start gap-3 font-medium">
                                <WorkspaceAvatar
                                    name={workspace.name}
                                    image={workspace.imageUrl}
                                />
                                <span className="truncate">
                                    {workspace.name}
                                </span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
