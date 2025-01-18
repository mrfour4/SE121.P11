import Image from "next/image";

export const EmptyFavorites = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <Image
                src="/empty-favorite.png"
                height={240}
                width={240}
                alt="Empty favorites"
            />
            <h2 className="mt-6 text-2xl font-semibold">No favorites found!</h2>
            <p className="mt-2 text-sm text-muted-foreground">
                Try favoriting some boards
            </p>
        </div>
    );
};
