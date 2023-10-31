import { ItemType } from "./ItemType";
import { RefsType } from "./RefsType";
export type ApplicationContext = {
  filteredList: ItemType[];
  currentMonth: string;
  income: number;
  expense: number;
  walletBalance: number;
  list: ItemType[];
  nextMonth: () => void;
  prevMonth: () => void;
  // handleAddItem: (e: ItemType) => void;
  handleAddEvent: () => void;
  handleDeleteItem: (id: string) => void;
  handleEditItem: (id: string, updatedItem: ItemType) => void;

  refs: RefsType;
};
