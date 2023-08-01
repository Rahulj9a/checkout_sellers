import { create } from "zustand";

interface useSideBarInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSideBar = create<useSideBarInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));