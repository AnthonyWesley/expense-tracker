import { createContext, useContext, useEffect, useState } from "react";
import { AppManagerContextType } from "../type/AppManagerType";
import { dateHelpers } from "../helpers/DateHelpers";
import { RecordType } from "../type/RecordType";
import { useApiContext } from "./ApiContext";
import { CategorySummaryType } from "../type/CategoryType";

export const AppManager = createContext<AppManagerContextType | null>(null);

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
  const { categories } = useApiContext();

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
    if (list) {
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
    }
  };

  const calculateTotalsByCategory = (list: RecordType[]) => {
    let expenseList: CategorySummaryType[] = [];
    let incomeList: CategorySummaryType[] = [];

    if (list) {
      list.forEach((item) => {
        const { category, value, description, date, id } = item;

        if (categories[category]?.expense) {
          // Expense
          const existingCategoryIndex = expenseList.findIndex(
            (c) => c.category === category
          );

          if (existingCategoryIndex !== -1) {
            expenseList[existingCategoryIndex].totalValue += value;
            expenseList[existingCategoryIndex].allDescriptions.push({
              description,
              date,
              value,
              id,
              category,
            });
          } else {
            expenseList.push({
              category,
              totalValue: value,
              color: categories[category]?.color,
              allDescriptions: [{ description, date, value, id, category }],
            });
          }
        } else {
          // Income
          const existingCategoryIndex = incomeList.findIndex(
            (c) => c.category === category
          );

          if (existingCategoryIndex !== -1) {
            incomeList[existingCategoryIndex].totalValue += value;
            incomeList[existingCategoryIndex].allDescriptions.push({
              description,
              date,
              value,
              id,
              category,
            });
          } else {
            incomeList.push({
              category,
              totalValue: value,
              color: categories[category]?.color,
              allDescriptions: [{ description, date, value, id, category }],
            });
          }
        }
      });
    }

    return { expenseList, incomeList };
  };

  useEffect(() => {
    calculateMonthlyIncomeAndExpense();
    calculateAllIncome();
  }, [filteredList, categories]);

  useEffect(() => {
    setFilteredList(dateHelpers.filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  return (
    <AppManager.Provider
      value={{
        filteredList,
        nextMonth,
        prevMonth,
        currentMonth,
        income,
        expense,
        walletBalance,
        calculateTotalsByCategory,
      }}
    >
      {children}
    </AppManager.Provider>
  );
}

export function useAppManager() {
  const context = useContext(AppManager);

  if (!context)
    throw new Error("AppManager must be used with a contextProvider");

  return context;
}
