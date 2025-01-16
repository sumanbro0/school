import { create } from "zustand";

type FormModalStore = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const useFormModalStore = create<FormModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));
