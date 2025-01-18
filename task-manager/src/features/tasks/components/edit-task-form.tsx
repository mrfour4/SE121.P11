"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { taskSchema } from "../schemas";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { DatePicker } from "@/components/date-picker";
import { DotSeparator } from "@/components/dot-separator";

import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

import { TaskStatus } from "@/types";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspace/hooks/use-workspace-id";
import { useGetTask } from "../api/use-get-task";
import { useUpdateTask } from "../api/use-update-task";

type FormValues = z.infer<typeof taskSchema>;

type Props = {
    id: string;
    onCancel?: () => void;
};

export const EditTaskForm = ({ id, onCancel }: Props) => {
    const workspaceId = useWorkspaceId();

    const projects = useGetProjects(workspaceId);
    const members = useGetMembers(workspaceId);
    const { data: task, isLoading } = useGetTask(id);

    const projectOptions = projects.data?.documents.map((project) => ({
        id: project.$id,
        name: project.name,
        imageUrl: project.imageUrl,
    }));

    const memberOptions = members.data?.documents.map((member) => ({
        id: member.$id,
        name: member.name,
    }));

    const form = useForm<FormValues>({
        resolver: zodResolver(
            taskSchema.omit({ workspaceId: true, description: true }),
        ),
        // defaultValues: {
        //     ...initialData,
        //     dueDate: initialData.dueDate
        //         ? new Date(initialData.dueDate)
        //         : undefined,
        // },
    });

    useEffect(() => {
        if (isLoading) return;

        if (task) {
            form.reset({
                ...task,
                dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
            });
        }
    }, [form, isLoading, task]);

    const { mutate, isPending } = useUpdateTask();

    const onSubmit = (values: FormValues) => {
        mutate(
            { json: values, param: { taskId: task!.$id } },
            {
                onSuccess: () => {
                    form.reset();
                    onCancel?.();
                },
            },
        );
    };

    return (
        <Card className="size-full border-none shadow-none">
            <CardHeader className="p-7">
                <CardTitle className="text-xl font-bold">Edit Task</CardTitle>
            </CardHeader>

            <div className="px-7">
                <DotSeparator />
            </div>

            <CardContent className="p-7">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder={
                                                isLoading
                                                    ? "Loading..."
                                                    : "Enter task name"
                                            }
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Due Date</FormLabel>
                                    <FormControl>
                                        <DatePicker
                                            disabled={isLoading}
                                            {...field}
                                            placeholder={
                                                isLoading
                                                    ? "Loading..."
                                                    : "Select due date"
                                            }
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="assigneeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Assignee</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select assignee" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {members.isLoading && (
                                                    <SelectItem
                                                        disabled
                                                        value="none"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Loader className="size-4 animate-spin text-muted-foreground" />
                                                            <span>
                                                                Loading
                                                                members...
                                                            </span>
                                                        </div>
                                                    </SelectItem>
                                                )}
                                                {memberOptions?.map(
                                                    (member) => (
                                                        <SelectItem
                                                            key={member.id}
                                                            value={member.id}
                                                        >
                                                            <div className="flex items-center gap-x-2">
                                                                <MemberAvatar
                                                                    className="size-6"
                                                                    name={
                                                                        member.name
                                                                    }
                                                                />
                                                                <span>
                                                                    {
                                                                        member.name
                                                                    }
                                                                </span>
                                                            </div>
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            disabled={isLoading}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        placeholder={
                                                            isLoading
                                                                ? "Loading..."
                                                                : "Select status"
                                                        }
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem
                                                    value={TaskStatus.BACKLOG}
                                                >
                                                    Backlog
                                                </SelectItem>
                                                <SelectItem
                                                    value={
                                                        TaskStatus.IN_PROGRESS
                                                    }
                                                >
                                                    In Progress
                                                </SelectItem>
                                                <SelectItem
                                                    value={TaskStatus.IN_REVIEW}
                                                >
                                                    In Review
                                                </SelectItem>
                                                <SelectItem
                                                    value={TaskStatus.TODO}
                                                >
                                                    Todo
                                                </SelectItem>
                                                <SelectItem
                                                    value={TaskStatus.DONE}
                                                >
                                                    Done
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="projectId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select project" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {projects.isLoading && (
                                                    <SelectItem
                                                        disabled
                                                        value="none"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Loader className="size-4 animate-spin text-muted-foreground" />
                                                            <span>
                                                                Loading
                                                                projects...
                                                            </span>
                                                        </div>
                                                    </SelectItem>
                                                )}
                                                {projectOptions?.map(
                                                    (project) => (
                                                        <SelectItem
                                                            key={project.id}
                                                            value={project.id}
                                                        >
                                                            <div className="flex items-center gap-x-2">
                                                                <ProjectAvatar
                                                                    className="size-6"
                                                                    name={
                                                                        project.name
                                                                    }
                                                                    image={
                                                                        project.imageUrl
                                                                    }
                                                                />
                                                                <span>
                                                                    {
                                                                        project.name
                                                                    }
                                                                </span>
                                                            </div>
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="!mt-7 flex items-center justify-between">
                            <Button
                                type="button"
                                size="lg"
                                variant="secondary"
                                onClick={onCancel}
                                disabled={isPending}
                                className={cn(!onCancel && "invisible")}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isPending}
                            >
                                {isPending ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
