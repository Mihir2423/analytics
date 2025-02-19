/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

type ModalType = "createProject" | "editProject" | "deleteProject" | null;

interface ModalStore {
  isOpen: boolean;
  type: ModalType;
  data?: any;
  onOpen: (type: ModalType, data?: any) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  type: null,
  data: undefined,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null, data: undefined }),
}));
