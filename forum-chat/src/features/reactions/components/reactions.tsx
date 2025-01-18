"use client";

import { Doc, Id } from "../../../../convex/_generated/dataModel";

import { EmojiPopover } from "@/components/emoji-popover";
import { Hint } from "@/components/hint";
import { useCurrentMember } from "@/features/members/api/use-current-member";

import { cn } from "@/lib/utils";
import { SmilePlus } from "lucide-react";

type Props = {
    data: Array<
        Omit<Doc<"reactions">, "memberId"> & {
            count: number;
            memberIds: Id<"members">[];
        }
    >;
    onChange: (value: string) => void;
};

export const Reactions = ({ data, onChange }: Props) => {
    const { data: currentMember } = useCurrentMember();

    if (data.length === 0 || !currentMember?._id) {
        return null;
    }

    return (
        <div className="my-1 flex items-center gap-1">
            {data.map((reaction) => {
                const memberReacted = reaction.memberIds.includes(
                    currentMember._id,
                );

                return (
                    <Hint
                        key={reaction._id}
                        label={
                            memberReacted
                                ? `cancel ${reaction.value}`
                                : `add ${reaction.value}`
                        }
                    >
                        <button
                            className={cn(
                                "flex h-6 items-center gap-x-1 rounded-full border border-transparent bg-slate-200/70 px-2 hover:border-slate-500",
                                memberReacted &&
                                    "border-blue-500 bg-blue-100/70 text-white",
                            )}
                            onClick={() => onChange(reaction.value)}
                        >
                            {reaction.value}
                            <span
                                className={cn(
                                    "text-xs font-semibold text-muted-foreground",
                                    memberReacted && "text-blue-500",
                                )}
                            >
                                {reaction.count}
                            </span>
                        </button>
                    </Hint>
                );
            })}

            <EmojiPopover
                hint="Add reaction"
                onEmojiSelected={(emoji) => onChange(emoji)}
            >
                <button className="flex h-7 items-center gap-x-1 rounded-full border border-transparent bg-slate-200/70 px-3 hover:border-slate-500">
                    <SmilePlus className="size-4" />
                </button>
            </EmojiPopover>
        </div>
    );
};
