import { RecordType } from "./RecordType";

export type AppManagerContextType = {
  filteredList: RecordType[];
  currentMonth: string;
  income: number;
  expense: number;
  walletBalance: number;
  nextMonth: () => void;
  prevMonth: () => void;
};
