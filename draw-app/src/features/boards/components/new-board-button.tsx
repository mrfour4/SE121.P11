import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useCreateBoard } from "../api/use-create-board";

type Props = {
    orgId: string;
    disabled?: boolean;
};

export const NewBoardButton = ({ orgId, disabled = false }: Props) => {
    const { isPending, mutate } = useCreateBoard();

    const onClick = () => {
        mutate({
            orgId,
            title: "Untitled",
        });
    };

    return (
        <button
            disabled={isPending || disabled}
            onClick={onClick}
            className={cn(
                "col-span-1 flex aspect-[100/127] flex-col items-center justify-center rounded-lg bg-blue-600 py-6 hover:bg-blue-800",
                disabled && "opacity-75 hover:bg-blue-600",
            )}
        >
            <div />
            <Plus className="size-12 stroke-1 text-white" />
            <p className="text-xs font-light text-white">New board</p>
        </button>
    );
};
