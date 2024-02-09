import { categories } from "../data/categories";
import { RecordType } from "../type/RecordType";

export const formattedCurrency = (currency: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(currency);
};

export const findItemByParams = (list: RecordType[], paramsId: string) => {
  return list.find((item) => item.id == paramsId);
};

export const formattedText = (text: string) =>
  text.length > 35 ? `${text.slice(0, 35)} ...` : text;

export type NewList = {
  id?: string;
  category: string;
  totalValue: number;
  color: string;
  allDescriptions: RecordType[];
};

export const getAllSunForCategories = (list: RecordType[]) => {
  let expenseList: NewList[] = [];
  let incomeList: NewList[] = [];

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

  // const validateForm = (date, category, description, value) => {
  //   const errors = [];

  //   if (!description || description.trim() === "") {
  //     errors.push("A descrição é obrigatória");
  //   }

  //   if (!category || category.trim() === "") {
  //     errors.push("A categoria é obrigatória");
  //   }

  //   if (!value || isNaN(value) || value <= 0) {
  //     errors.push("O valor deve ser um número positivo");
  //   }

  //   const regexDate = /^\d{4}-\d{2}-\d{2}$/;
  //   if (!date || !regexDate.test(date)) {
  //     errors.push("A data é inválida. Use o formato DD-MM-YYYY");
  //   }

  //   return errors;
  // };

  return { expenseList, incomeList };
};
