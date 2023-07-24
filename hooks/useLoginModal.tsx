import { create } from "zustand";

interface useLoginModalInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useLoginModal = create<useLoginModalInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));