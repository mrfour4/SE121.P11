"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { DotSeparator } from "@/components/dot-separator";

import { useJoinWorkspace } from "../api/use-join-workspace";

type Props = {
    initialValues: {
        name: string;
        workspaceId: string;
        inviteCode: string;
    };
};

export const JoinWorkspaceForm = ({ initialValues }: Props) => {
    const { name, workspaceId, inviteCode } = initialValues;

    const { mutate, isPending } = useJoinWorkspace();
    const router = useRouter();

    const onSubmit = () => {
        mutate(
            {
                json: { code: inviteCode },
                param: { workspaceId },
            },
            {
                onSuccess: ({ data }) => {
                    router.replace(`/workspaces/${data.$id}`);
                },
            },
        );
    };

    return (
        <Card className="size-full border-none shadow-none">
            <CardHeader className="p-7">
                <CardTitle className="text-xl font-bold">
                    Join workspace
                </CardTitle>
                <CardDescription>
                    You&apos;ve been invited to join the workspace{" "}
                    <strong className="capitalize">{name}</strong>.
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DotSeparator />
            </div>
            <CardContent className="p-7">
                <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
                    <Button
                        asChild
                        type="button"
                        variant="secondary"
                        size="lg"
                        className="w-full lg:w-fit"
                        disabled={isPending}
                    >
                        <Link href="/">Cancel</Link>
                    </Button>

                    <Button
                        type="button"
                        size="lg"
                        className="w-full lg:w-fit"
                        onClick={onSubmit}
                        disabled={isPending}
                    >
                        Join workspace
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
