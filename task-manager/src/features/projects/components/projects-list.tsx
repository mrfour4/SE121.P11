import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Project } from "@/types";
import { Plus } from "lucide-react";

import { DotSeparator } from "@/components/dot-separator";
import { ProjectAvatar } from "./project-avatar";

import { useWorkspaceId } from "@/features/workspace/hooks/use-workspace-id";
import { useCreateProjectModal } from "../hooks/use-create-project-modal";

type Props = {
    data: Project[];
    total: number;
};

export const ProjectList = ({ data, total }: Props) => {
    const workspaceId = useWorkspaceId();
    const { open } = useCreateProjectModal();

    return (
        <div className="col-span-1 flex flex-col gap-y-4">
            <div className="rounded-lg border bg-white p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Projects ({total})</p>
                    <Button variant="secondary" size="icon" onClick={open}>
                        <Plus className="text-neutral-400" />
                    </Button>
                </div>
                <DotSeparator className="my-4" />
                <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {data.map((project) => (
                        <li key={project.$id}>
                            <Link
                                href={`/workspaces/${workspaceId}/projects/${project.$id}`}
                            >
                                <Card className="rounded-lg shadow-none transition hover:opacity-75">
                                    <CardContent className="flex items-center gap-x-2.5 p-4">
                                        <ProjectAvatar
                                            name={project.name}
                                            image={project.imageUrl}
                                            className="size-12"
                                            fallbackClassName="text-lg"
                                        />
                                        <p className="truncate text-lg font-medium">
                                            {project.name}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </li>
                    ))}
                    <li className="hidden text-center text-sm text-muted-foreground first-of-type:block">
                        No projects found
                    </li>
                </ul>
            </div>
        </div>
    );
};
