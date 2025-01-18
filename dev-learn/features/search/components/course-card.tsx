import Image from "next/image";
import Link from "next/link";

import { formatPrice } from "@/lib/format";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { CourseProgress } from "@/features/courses/components/course-progress";

type Props = {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    progress: number | null;
    category: string;
};

export const CourseCard = ({
    id,
    title,
    imageUrl,
    category,
    chaptersLength,
    price,
    progress,
}: Props) => {
    return (
        <Link href={`/courses/${id}`}>
            <div className="group h-full p-3 border rounded-lg overflow-hidden hover:shadow-sm transition">
                <AspectRatio
                    ratio={16 / 9}
                    className="relative w-full rounded-md overflow-hidden"
                >
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        priority
                        className="object-cover"
                    />
                </AspectRatio>

                <div className="flex flex-col pt-2">
                    <p className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                        {title}
                    </p>

                    <p className="text-xs text-muted-foreground">{category}</p>

                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-slate-500">
                            <IconBadge size="sm" icon={BookOpen} />
                            <span>
                                {chaptersLength}{" "}
                                {chaptersLength === 1 ? "Chapter" : "Chapters"}
                            </span>
                        </div>
                    </div>

                    {progress !== null ? (
                        <CourseProgress
                            value={progress}
                            size="sm"
                            variant={progress === 100 ? "success" : "default"}
                        />
                    ) : (
                        <p className="text-base md:text-sm font-medium text-slate-700">
                            {formatPrice(price)}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};
