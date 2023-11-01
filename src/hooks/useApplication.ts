import { categories } from "@/data/categories";
import { filterListByMonth, getCurrentMonth } from "@/helpers/dateFilter";
import { ItemType } from "@/type/ItemType";

import { useEffect, useState } from "react";

export default function useApplication(list: ItemType[]) {
  const [filteredList, setFilteredList] = useState<ItemType[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

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
    const [year, month] = currentMonth.split("-");

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
    const newList: ItemType[] = [...list];
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
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  return {
    filteredList,
    currentMonth,
    income,
    expense,
    walletBalance,
    prevMonth,
    nextMonth,
  };
}
