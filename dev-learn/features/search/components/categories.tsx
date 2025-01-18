import { Category } from "@prisma/client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { CategoryItem } from "./category-item";

type Props = {
    items: Category[];
};

export const Categories = ({ items }: Props) => {
    return (
        <ScrollArea className="w-[calc(100vw-50px)] md:w-[calc(100vw-280px)] whitespace-nowrap">
            <div className="flex items-center gap-x-2 pb-4">
                {items.map((item) => (
                    <CategoryItem
                        key={item.id}
                        label={item.name}
                        value={item.id}
                    />
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
};
