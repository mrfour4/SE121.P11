import { Skeleton } from "@/components/ui/skeleton";

import { BoardCard, BoardCardSkeleton } from "./board-card";
import { EmptyBoards } from "./empty-boards";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";
import { NewBoardButton } from "./new-board-button";

import { useGetBoards } from "../api/use-get-boards";

type Props = {
    orgId: string;
    query: {
        search?: string;
        favorite?: string;
    };
};

export const BoardList = ({ orgId, query: { favorite, search } }: Props) => {
    const { data, isPending } = useGetBoards(orgId, search, favorite);

    if (isPending) {
        return (
            <div>
                <h2 className="text-3xl">
                    {favorite ? "Favorite Boards" : "Team Boards"}
                </h2>
                <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    <NewBoardButton orgId={orgId} disabled />
                    {[...Array(4)].map((_, index) => (
                        <BoardCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (!data?.length && favorite) {
        return <EmptyFavorites />;
    }

    if (!data?.length && search) {
        return <EmptySearch />;
    }

    if (!data?.length) {
        return <EmptyBoards />;
    }

    return (
        <div>
            <h2 className="text-3xl">
                {favorite ? "Favorite Boards" : "Team Boards"}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                <NewBoardButton orgId={orgId} />
                {data.map((board) => (
                    <BoardCard
                        key={board._id}
                        id={board._id}
                        title={board.title}
                        authorName={board.authorName}
                        authorId={board.authorId}
                        imageUrl={board.imageUrl}
                        orgId={board.orgId}
                        createdAt={board._creationTime}
                        isFavorite={board.isFavorite}
                    />
                ))}
            </div>
        </div>
    );
};

export const BoardListSkeleton = () => {
    return (
        <div>
            <Skeleton className="h-10 w-40" />
            <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                <NewBoardButton orgId={""} disabled />
                {[...Array(4)].map((_, index) => (
                    <BoardCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};
