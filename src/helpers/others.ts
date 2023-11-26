import { categories } from "@/data/categories";
import { ItemType } from "@/type/ItemType";

export const FormattedCurrency = (currency: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(currency);
};

export const findItemByParams = (list: ItemType[], paramsId: string) => {
  return list.find((item) => item.id == paramsId);
};

export const formattedText = (text: string) =>
  text.length > 50 ? `${text.slice(0, 50)} ...` : text;

export const getAllSunForCategories = (list: ItemType[]) => {
  type NewList = {
    category: string;
    totalValue: number;
    color: string;
    allDescriptions: ItemType[];
  };

  let expenseList: NewList[] = [];
  let incomeList: NewList[] = [];

  if (list) {
    list.forEach((item) => {
      const { category, value, title, date, id } = item;

      if (categories[category]?.expense) {
        // Expense
        const existingCategoryIndex = expenseList.findIndex(
          (c) => c.category === category
        );

        if (existingCategoryIndex !== -1) {
          expenseList[existingCategoryIndex].totalValue += value;
          expenseList[existingCategoryIndex].allDescriptions.push({
            title,
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
            allDescriptions: [{ title, date, value, id, category }],
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
            title,
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
            allDescriptions: [{ title, date, value, id, category }],
          });
        }
      }
    });
  }

  return { expenseList, incomeList };
};
