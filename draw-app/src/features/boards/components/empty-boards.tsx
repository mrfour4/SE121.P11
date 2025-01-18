import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useOrganization } from "@clerk/nextjs";
import { useCreateBoard } from "../api/use-create-board";

export const EmptyBoards = () => {
    const { isPending, mutate } = useCreateBoard();
    const { organization } = useOrganization();

    const onClick = () => {
        if (!organization) return;

        mutate({
            orgId: organization.id,
            title: "Untitled",
        });
    };

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <Image
                src="/empty-board.png"
                height={240}
                width={240}
                alt="Empty boards"
            />
            <h2 className="mt-6 text-2xl font-semibold">
                Create your first board!
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
                Start by creating a board for your organization
            </p>
            <div className="mt-6">
                <Button size="lg" disabled={isPending} onClick={onClick}>
                    Create board
                </Button>
            </div>
        </div>
    );
};
