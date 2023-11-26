import { ItemType } from "./ItemType";

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

  category: string;
  date: string;
  title: string;
  value: string;

  // setValue: React.Dispatch<React.SetStateAction<string>>;
  // setTitle: React.Dispatch<React.SetStateAction<string>>;
  // setCategory: React.Dispatch<React.SetStateAction<string>>;
  // setDate: React.Dispatch<React.SetStateAction<string>>;
};
