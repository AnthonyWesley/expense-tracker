import { create } from "zustand";

export type Record = {
  id?: string;
  date: string;
  category: string;
  title: string;
  value: string;
};

type ActionsRecord = {
  updateId: (id: string) => void;
  updateDate: (data: string) => void;
  updateCategory: (category: string) => void;
  updateTitle: (title: string) => void;
  updateValue: (value: string) => void;
};

export const useRecordStore = create<Record & ActionsRecord>((set) => ({
  id: "",
  date: "",
  category: "",
  title: "",
  value: "",

  updateId: (id) => set(() => ({ id: id })),
  updateDate: (date) => set(() => ({ date: date })),
  updateCategory: (category) => set(() => ({ category: category })),
  updateTitle: (title) => set(() => ({ title: title })),
  updateValue: (value) => set(() => ({ value: value })),
}));
