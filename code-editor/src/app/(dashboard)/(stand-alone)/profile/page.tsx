import { Content } from "@/features/profile/components/content";
import { Stats } from "@/features/profile/components/stats";

export default function ProfilePage() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-12">
            <Stats />
            <Content />
        </div>
    );
}
