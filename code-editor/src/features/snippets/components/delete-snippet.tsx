import { Id } from "../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";

import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteSnippet } from "../api/use-delete-snippet";

type Props = {
    id: string;
};

export const DeleteSnippet = ({ id }: Props) => {
    const { isPending, mutate } = useDeleteSnippet();
    const { confirm, ConfirmDialog } = useConfirm("Delete snippet");

    const onClick = async () => {
        const ok = await confirm();
        if (!ok) return;

        mutate({ id: id as Id<"snippets"> });
    };

    return (
        <>
            <ConfirmDialog />
            <Button
                variant="secondary"
                className="size-7 border-none bg-gray-500/10 ring-0 hover:bg-red-500/10 hover:text-red-400"
                disabled={isPending}
                onClick={onClick}
            >
                {isPending ? (
                    <Loader className="!size-3.5 animate-spin" />
                ) : (
                    <Trash2 className="!size-3.5" />
                )}
            </Button>
        </>
    );
};
