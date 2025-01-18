import { createStore } from "zustand/vanilla";
import { Doc } from "../../convex/_generated/dataModel";

export type ModalType =
    | "create-workspace"
    | "update-workspace"
    | "delete-workspace"
    | "create-channel"
    | "update-channel"
    | "delete-channel"
    | "invite";

export type Workspace = Partial<Doc<"workspaces">>;
export type Channel = Partial<Doc<"channels">>;

export type ModalState = {
    type: ModalType | null;
    workspace?: Workspace;
    channel?: Channel;
    isOpen: boolean;
    triggerScroll?: number;
};

export type ModalActions = {
    onOpen: (type: ModalType, workspace?: Workspace) => void;
    onScroll: () => void;
    onClose: () => void;
};

export type ModalStore = ModalState & ModalActions;

export const defaultInitState: ModalState = {
    type: null,
    isOpen: false,
    triggerScroll: 0,
    workspace: {},
};

export const createModalStore = (initState: ModalState = defaultInitState) => {
    return createStore<ModalStore>()((set) => ({
        ...initState,
        onOpen: (type, workspace) =>
            set(() => ({ isOpen: true, type, workspace })),
        onClose: () =>
            set(() => ({ isOpen: false, type: null, workspace: {} })),
        onScroll: () =>
            set((state) => ({
                ...state,
                triggerScroll: state.triggerScroll || 0 + 1,
            })),
    }));
};
