import { redirect } from "next/navigation";

import { getWorkspaces } from "@/features/workspace/queries/get-workspaces";

export default async function AppPage() {
    const workspaces = await getWorkspaces();
    if (workspaces.total > 0) {
        redirect(`/workspaces/${workspaces.documents[0].$id}`);
    } else {
        redirect("/workspaces/create");
    }
}
