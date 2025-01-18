"use client";

import Link from "next/link";
import { Fragment } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { MemberRole } from "@/types";
import { ArrowLeft, Loader, MoreHorizontal, ShieldAlert } from "lucide-react";

import { DotSeparator } from "@/components/dot-separator";
import { MemberAvatar } from "./member-avatar";

import { useWorkspaceId } from "@/features/workspace/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";

import { useDeleteMember } from "../api/use-delete-member";
import { useGetMembers } from "../api/use-get-members";
import { useUpdateMember } from "../api/use-update-member";

export const Members = () => {
    const workspaceId = useWorkspaceId();
    const { data, isLoading } = useGetMembers(workspaceId);
    const updateMember = useUpdateMember();
    const deleteMember = useDeleteMember();

    const { ConfirmDialog, confirm } = useConfirm({
        title: "Remove Member",
        message: "This member will be removed from the workspace.",
    });

    const isPending = updateMember.isPending || deleteMember.isPending;

    const onUpdate = (memberId: string, role: MemberRole) => {
        updateMember.mutate({
            param: { memberId },
            json: { role },
        });
    };

    const onDelete = async (memberId: string) => {
        const ok = await confirm();
        if (!ok) return;
        deleteMember.mutate({ param: { memberId } });
    };

    if (isLoading) {
        return <MemberLoading />;
    }

    return (
        <Card className="size-full border-none shadow-none">
            <ConfirmDialog />
            <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
                <Button
                    asChild
                    variant="link"
                    size="sm"
                    className="border-none"
                >
                    <Link href={`/workspaces/${workspaceId}`}>
                        <ArrowLeft />
                        Back
                    </Link>
                </Button>

                <CardTitle className="text-xl font-bold">
                    Members List
                </CardTitle>
            </CardHeader>

            <div className="px-7">
                <DotSeparator />
            </div>

            <CardContent className="p-7">
                {data?.documents.map((member, index) => (
                    <Fragment key={member.$id}>
                        {index > 0 && <Separator className="my-2.5" />}
                        <div className="flex items-center gap-2">
                            <MemberAvatar
                                name={member.name}
                                className="size-10"
                                fallbackClassName="text-lg"
                            />

                            <div className="flex flex-col">
                                <div className="flex items-center gap-x-1">
                                    <p className="text-sm font-medium">
                                        {member.name}
                                    </p>
                                    {member.role === MemberRole.ADMIN && (
                                        <ShieldAlert className="size-4 text-amber-700" />
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {member.email}
                                </p>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="ml-auto"
                                        variant="secondary"
                                        size="icon"
                                        disabled={isPending}
                                    >
                                        {isPending ? (
                                            <Loader className="animate-spin text-muted-foreground" />
                                        ) : (
                                            <MoreHorizontal className="text-muted-foreground" />
                                        )}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="end">
                                    <DropdownMenuItem
                                        onClick={() =>
                                            onUpdate(
                                                member.$id,
                                                MemberRole.ADMIN,
                                            )
                                        }
                                    >
                                        Set as Admin
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        onClick={() =>
                                            onUpdate(
                                                member.$id,
                                                MemberRole.MEMBER,
                                            )
                                        }
                                    >
                                        Set as Member
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        className="text-amber-700"
                                        onClick={() => onDelete(member.$id)}
                                    >
                                        Remove {member.name}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </Fragment>
                ))}
            </CardContent>
        </Card>
    );
};

export const MemberLoading = () => {
    const workspaceId = useWorkspaceId();
    return (
        <Card className="size-full border-none shadow-none">
            <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
                <Button
                    variant="link"
                    size="sm"
                    className="border-none"
                    asChild
                >
                    <Link href={`/workspaces/${workspaceId}`}>
                        <ArrowLeft />
                        Back
                    </Link>
                </Button>

                <CardTitle className="text-xl font-bold">
                    Members List
                </CardTitle>
            </CardHeader>

            <div className="px-7">
                <DotSeparator />
            </div>

            <CardContent className="p-7">
                {[1, 2, 3].map((_, index) => (
                    <Fragment key={index}>
                        {index !== 0 && <Separator className="my-2.5" />}
                        <div className="flex items-center gap-2" key={index}>
                            <Skeleton className="size-10 rounded-full" />
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <Skeleton className="ml-auto h-6 w-2 self-start" />
                        </div>
                    </Fragment>
                ))}
            </CardContent>
        </Card>
    );
};
