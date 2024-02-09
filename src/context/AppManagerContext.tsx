import { createContext, useContext, useEffect, useState } from "react";
import { AppManagerContextType } from "../type/AppManagerContextType";
import { categories } from "../data/categories";
import { dateHelpers } from "../helpers/DateHelpers";
import { RecordType } from "../type/RecordType";
import { useApiContext } from "./ApiContext";

export const AppManagerContext = createContext<AppManagerContextType | null>(
  null
);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentMonth, setCurrentMonth] = useState(
    dateHelpers.getCurrentMonth()
  );
  const [filteredList, setFilteredList] = useState<RecordType[]>([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

  const { list } = useApiContext();

  const prevMonth = () => {
    const [year, month] = currentMonth.split("-");
    const currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() - 1);
    setCurrentMonth(
      `${currentDate.getFullYear()} - ${currentDate.getMonth() + 1}`
    );
  };

  const nextMonth = () => {
    const [year, month] = currentMonth.split("-");
    const currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() + 1);
    setCurrentMonth(
      `${currentDate.getFullYear()} - ${currentDate.getMonth() + 1}`
    );
  };

  const calculateMonthlyIncomeAndExpense = () => {
    let newIncome = 0;
    let newExpense = 0;
    const [_, month] = currentMonth.split("-");

    for (const i in filteredList) {
      if (
        categories[filteredList[i].category]?.expense &&
        filteredList[i]?.date &&
        filteredList[i]?.date.getMonth() + 1 === parseInt(month)
      ) {
        newExpense += filteredList[i].value;
      } else {
        newIncome += filteredList[i].value;
      }
    }
    setIncome(newIncome);
    setExpense(newExpense);
  };

  const calculateAllIncome = () => {
    const newList: RecordType[] = [...list];
    const expenseItems = newList.filter(
      (item) => categories[item?.category]?.expense
    );

    const totalExpense = expenseItems.reduce(
      (total, item) => total + item?.value,
      0
    );

    const incomeItems = newList.filter(
      (item) => !categories[item?.category]?.expense
    );

    const totalIncome = incomeItems.reduce(
      (total, item) => total + item?.value,
      0
    );

    setWalletBalance(totalIncome - totalExpense);
  };

  useEffect(() => {
    calculateMonthlyIncomeAndExpense();
    calculateAllIncome();
  }, [filteredList]);

  useEffect(() => {
    setFilteredList(dateHelpers.filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  return (
    <AppManagerContext.Provider
      value={{
        filteredList,
        nextMonth,
        prevMonth,
        currentMonth,
        income,
        expense,
        walletBalance,
      }}
    >
      {children}
    </AppManagerContext.Provider>
  );
}

export function useAppManager() {
  const context = useContext(AppManagerContext);

  if (!context)
    throw new Error("AppManagerContext must be used with a contextProvider");

  return context;
}
