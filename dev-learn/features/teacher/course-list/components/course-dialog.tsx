"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import { CreateCourseForm, CreateFormValues } from "./form-create";

import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useCreateCourse } from "../hooks/use-create-course";

export const CourseDialog = () => {
    const [open, setOpen] = useState(false);
    const formId = useId();

    const isDesktop = useMediaQuery("(min-width: 768px)");

    const { mutate, isPending } = useCreateCourse();
    const router = useRouter();

    const onSubmit = (values: CreateFormValues) => {
        mutate(values, {
            onSuccess(data) {
                router.refresh();
                router.push(`/teacher/courses/${data.id}`);

                setOpen(false);
                toast.success("Course created");
            },
        });
    };

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="size-4 mr-2" />
                        Create course
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Name your course</DialogTitle>
                        <DialogDescription>
                            What would you like to name your course? Don&apos;t
                            worry, you can change this later.
                        </DialogDescription>
                    </DialogHeader>

                    <CreateCourseForm id={formId} onCreate={onSubmit} />

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>

                        <Button
                            type="submit"
                            form={formId}
                            disabled={isPending}
                        >
                            Continue
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button className="gap-x-2">
                    <PlusCircle className="size-4" />
                    <span className="hidden sm:block">Create new course</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Name your course</DrawerTitle>
                    <DrawerDescription>
                        What would you like to name your course? Don&apos;t
                        worry, you can change this later.
                    </DrawerDescription>
                </DrawerHeader>

                <CreateCourseForm
                    id={formId}
                    onCreate={onSubmit}
                    className="px-4"
                />

                <DrawerFooter>
                    <Button type="submit" form={formId}>
                        Continue
                    </Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
