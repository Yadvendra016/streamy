import { create } from "zustand";

interface SidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollpase: () => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  collapsed: false,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollpase: () => set(() => ({ collapsed: true })),
}));
