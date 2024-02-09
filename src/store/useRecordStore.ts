import { create } from "zustand";

export type Record = {
  id?: string;
  date: string;
  category: string;
  description: string;
  value: string;
};

type ActionsRecord = {
  updateId: (id: string) => void;
  updateDate: (data: string) => void;
  updateCategory: (category: string) => void;
  updateDescription: (description: string) => void;
  updateValue: (value: string) => void;
};

export const useRecordStore = create<Record & ActionsRecord>((set) => ({
  id: "",
  date: "",
  category: "",
  description: "",
  value: "",

  updateId: (id) => set(() => ({ id: id })),
  updateDate: (date) => set(() => ({ date: date })),
  updateCategory: (category) => set(() => ({ category: category })),
  updateDescription: (description) => set(() => ({ description: description })),
  updateValue: (value) => set(() => ({ value: value })),
}));
