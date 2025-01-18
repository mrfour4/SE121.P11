"use client";

import {
    BoardList,
    BoardListSkeleton,
} from "@/features/boards/components/board-list";
import { EmptyOrg } from "@/features/boards/components/empty-org";

import { useOrganization } from "@clerk/nextjs";

type Props = {
    searchParams: {
        search?: string;
        favorite?: string;
    };
};

export default function DashboardPage({ searchParams }: Props) {
    const { organization, isLoaded } = useOrganization();

    if (!isLoaded) {
        return <BoardListSkeleton />;
    }

    return (
        <div className="h-[calc(100%-80px)] flex-1 p-6">
            {!organization ? (
                <EmptyOrg />
            ) : (
                <BoardList orgId={organization.id} query={searchParams} />
            )}
        </div>
    );
}
