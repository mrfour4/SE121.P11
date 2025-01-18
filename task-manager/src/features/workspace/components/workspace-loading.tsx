import { DotSeparator } from "@/components/dot-separator";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Settings } from "lucide-react";
import { Fragment } from "react";

export const WorkspaceLoadingPage = () => {
    return (
        <div className="flex h-full flex-col space-y-4">
            <div className="flex h-28 w-full gap-1">
                {[1, 2, 3, 4, 5].map((index) => (
                    <Fragment key={index}>
                        <Skeleton className="flex-1" />
                    </Fragment>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <div className="col-span-1 flex flex-col gap-y-4">
                    <div className="rounded-lg bg-muted p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-semibold">Tasks</p>
                            <Button variant="muted" size="icon" disabled>
                                <Plus className="text-neutral-400" />
                            </Button>
                        </div>
                        <DotSeparator className="my-4" />
                        <ul className="flex h-[50vh] flex-col gap-y-4">
                            {[1, 2, 3, 4].map((index) => (
                                <li key={index}>
                                    <Skeleton className="h-20 w-full" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="col-span-1 flex flex-col gap-y-4">
                        <div className="rounded-lg border bg-white p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-lg font-semibold">
                                    Projects
                                </p>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    disabled
                                >
                                    <Plus className="text-neutral-400" />
                                </Button>
                            </div>
                            <DotSeparator className="my-4" />
                            <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                {[1, 2, 3, 4, 5].map((index) => (
                                    <li key={index}>
                                        <Skeleton className="h-20 w-full" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-span-1 flex flex-col gap-y-4">
                            <div className="rounded-lg border bg-white p-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-lg font-semibold">
                                        Members
                                    </p>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        disabled
                                    >
                                        <Settings className="text-neutral-400" />
                                    </Button>
                                </div>
                                <DotSeparator className="my-4" />
                                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <li key={index}>
                                            <Skeleton className="h-20 w-full" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
