import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { DataCard } from "@/features/analytics/components/data-card";
import { DataChart } from "@/features/analytics/components/data-chart";

import { getAnalytics } from "@/actions/get-analytics";

export default async function AnalyticsPage() {
    const { userId } = auth();

    if (!userId) {
        redirect("/");
    }

    const { data, totalSales, totalRevenues } = await getAnalytics(userId);

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DataCard
                    label="Total Revenues"
                    value={totalRevenues}
                    shouldFormat
                />
                <DataCard label="Total Sales" value={totalSales} />
            </div>

            <DataChart data={data} />
        </div>
    );
}
