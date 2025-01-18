import { getFollowers } from "@/features/username/service/get-followers";
import { getRecommended } from "../service/get-recommened";

import { Tools } from "@/components/tools";
import { Following, FollowingSkeleton } from "./following";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { Toggle, ToggleSkeleton } from "./toggle";
import { Wrapper } from "./wrapper";

export const Sidebar = async () => {
    const recommended = await getRecommended();
    const following = await getFollowers();

    return (
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 lg:pt-0">
                <Following data={following} />
                <Recommended users={recommended} />
            </div>
            <Tools />
        </Wrapper>
    );
};

export const SidebarSkeleton = () => {
    return (
        <aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2d2e35] bg-background lg:w-60">
            <ToggleSkeleton />
            <FollowingSkeleton />
            <RecommendedSkeleton />
        </aside>
    );
};
