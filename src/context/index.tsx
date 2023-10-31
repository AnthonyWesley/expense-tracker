"use client";
import useAddData from "@/hooks/useAddData";
import useApplication from "@/hooks/useApplication";
import { ApplicationContext } from "@/type/AppContextType";

import { createContext, useContext } from "react";

export const AppContext = createContext<ApplicationContext | null>(null);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { refs, handleAddEvent, list, handleDeleteItem, handleEditItem } =
    useAddData();

  const {
    filteredList,
    nextMonth,
    prevMonth,
    currentMonth,
    income,
    expense,
    walletBalance,
  } = useApplication(list);
  return (
    <AppContext.Provider
      value={{
        filteredList,
        nextMonth,
        prevMonth,
        currentMonth,
        income,
        expense,
        walletBalance,
        handleAddEvent,
        handleDeleteItem,
        handleEditItem,
        list,
        refs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context)
    throw new Error("useAppContext must be used with a contextProvider");

  return context;
}
