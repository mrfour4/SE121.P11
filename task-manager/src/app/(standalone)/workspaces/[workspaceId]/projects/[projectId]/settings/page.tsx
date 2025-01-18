"use client";

import { PageError } from "@/components/page-error";

import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { SettingLoading } from "@/features/projects/components/settings-loading";

import { useGetProject } from "@/features/projects/api/use-get-project";
import { useProjectId } from "@/features/projects/hooks/use-project-id";

export default function ProjectSettingsPage() {
    const projectId = useProjectId();
    const { data: project, isLoading } = useGetProject(projectId);

    if (isLoading) {
        return <SettingLoading title="Project settings" />;
    }

    if (!project) {
        return <PageError message="Project not found" />;
    }

    return (
        <div className="w-full lg:max-w-xl">
            <EditProjectForm initialData={project} />
        </div>
    );
}
