import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Settings } from "lucide-react";

import { DotSeparator } from "@/components/dot-separator";
import { MemberAvatar } from "./member-avatar";

import { useWorkspaceId } from "@/features/workspace/hooks/use-workspace-id";
import { Member } from "@/types";

type MemberExtend = Member & {
    name: string;
    email: string;
};

type Props = {
    data: MemberExtend[];
    total: number;
};

export const MembersList = ({ data, total }: Props) => {
    const workspaceId = useWorkspaceId();

    return (
        <div className="col-span-1 flex flex-col gap-y-4">
            <div className="rounded-lg border bg-white p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Members ({total})</p>
                    <Button variant="secondary" size="icon" asChild>
                        <Link href={`/workspaces/${workspaceId}/members`}>
                            <Settings className="text-neutral-400" />
                        </Link>
                    </Button>
                </div>
                <DotSeparator className="my-4" />
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((member) => (
                        <li key={member.$id}>
                            <Card className="overflow-hidden rounded-lg shadow-none">
                                <CardContent className="flex flex-col items-center gap-y-2 p-3">
                                    <MemberAvatar
                                        name={member.name}
                                        className="size-12"
                                        fallbackClassName="text-lg"
                                    />
                                    <div className="flex flex-col items-center overflow-hidden">
                                        <p className="truncate text-sm font-medium">
                                            {member.name}
                                        </p>
                                        <p className="line-clamp-1 text-xs text-muted-foreground">
                                            {member.email}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </li>
                    ))}
                    <li className="hidden text-center text-sm text-muted-foreground first-of-type:block">
                        No members found
                    </li>
                </ul>
            </div>
        </div>
    );
};
