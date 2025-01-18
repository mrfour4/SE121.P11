"use client";

import { formatPrice } from "@/lib/format";

import { Button } from "@/components/ui/button";
import { usePurchaseCourse } from "../hooks/use-purchase-course";

type Props = {
    courseId: string;
    price: number;
};

export const CourseEnrollButton = ({ courseId, price }: Props) => {
    const { mutate, isPending } = usePurchaseCourse();

    const onClick = () => {
        mutate(courseId, {
            onSuccess(data) {
                window.location.assign(data.url);
            },
        });
    };
    return (
        <Button
            size="sm"
            className="w-full md:w-auto"
            disabled={isPending}
            onClick={onClick}
        >
            Enroll for {formatPrice(price)}
        </Button>
    );
};
