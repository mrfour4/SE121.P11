import { create } from "zustand";

interface Store {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
}

export const useCreatorSidebar = create<Store>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true })),
}));
