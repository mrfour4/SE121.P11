"use client";

import { Course } from "@prisma/client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { toast } from "sonner";

import { FileUpload } from "@/components/file-upload";
import { useUpdateCourse } from "../hooks/use-update-course";

type Props = {
    initialData: Course;
    courseId: string;
};

export const ImageForm = ({ initialData, courseId }: Props) => {
    const [isEditing, setIsEditing] = useState(false);

    const { mutate } = useUpdateCourse(courseId);
    const router = useRouter();

    const onToggle = () => {
        setIsEditing(!isEditing);
    };

    const onSubmit = async (values: { imageUrl: string }) => {
        mutate(values, {
            onSuccess() {
                onToggle();
                toast.success("Image updated");
                router.refresh();
            },
        });
    };

    return (
        <div className="mt-6 p-4 border bg-slate-100 rounded-md shadow-md">
            <div className="flex items-center justify-between">
                <p className="text-base font-medium">Course Image</p>
                <Button variant="ghost" onClick={onToggle}>
                    {isEditing && "Cancel"}

                    {!isEditing &&
                        (!initialData.imageUrl ? (
                            <>
                                <PlusCircle className="size-4 mr-2" />
                                Add an image
                            </>
                        ) : (
                            <>
                                <Pencil className="size-4 mr-2" />
                                Edit image
                            </>
                        ))}
                </Button>
            </div>
            {!isEditing ? (
                !initialData.imageUrl ? (
                    <div className="h-60 flex items-center justify-center bg-slate-200 rounded-md">
                        <ImageIcon className="size-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="mt-2">
                        <AspectRatio ratio={16 / 9} className="relative">
                            <Image
                                fill
                                src={initialData.imageUrl}
                                alt="Image"
                                className="object-cover rounded-md"
                            />
                        </AspectRatio>
                    </div>
                )
            ) : (
                <div>
                    <FileUpload
                        endpoint="courseImage"
                        onChange={(url) => onSubmit({ imageUrl: url })}
                    />

                    <p className="text-xs text-muted-foreground mt-4">
                        16:8 aspect ratio recommend
                    </p>
                </div>
            )}
        </div>
    );
};
