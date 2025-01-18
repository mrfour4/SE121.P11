import { columns } from "@/features/community/components/columns";
import { DataTable } from "@/features/community/components/data-table";

import { getBlockedUsers } from "@/features/username/service/get-blocked-users";
import { format } from "date-fns";

export default async function CommunityPage() {
    const blockedUsers = await getBlockedUsers();

    const formattedData = blockedUsers.map((block) => ({
        ...block,
        userId: block.blocked.id,
        imageUrl: block.blocked.imageUrl,
        username: block.blocked.username,
        createdAt: format(new Date(block.blocked.createdAt), "dd/MM/yyyy"),
    }));

    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Community Settings</h1>
                <DataTable columns={columns} data={formattedData} />
            </div>
        </div>
    );
}
