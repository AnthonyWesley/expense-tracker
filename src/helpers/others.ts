import { ErrorObject } from "../components/Toast";
import { categories } from "../data/categories";
import { CategoriesType } from "../type/CategoriesType";
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

  return { expenseList, incomeList };
};
export const categorizeCategories = (cat: CategoriesType) => {
  const incomeKeys: string[] = [];
  const expenseKeys: string[] = [];

  for (const key in cat) {
    const category = cat[key];
    if (category?.expense) {
      expenseKeys.push(key);
    } else {
      incomeKeys.push(key);
    }
  }
  return { incomeKeys, expenseKeys };
};

interface Record {
  date: string;
  category: string;
  value: string;
  description: string;
}
export const validateFields = ({
  date,
  category,
  value,
  description,
}: Record) => {
  const newErrors: ErrorObject = {};
  if (!date) newErrors.errorDate = "DATA INVÁLIDA";
  if (!category) newErrors.errorCategory = "CATEGORIA INVÁLIDA";
  if (!Number(value)) newErrors.errorValue = "VALOR INVÁLIDO";
  if (description.length < 4) newErrors.errorDescription = "DESCRIÇÃO INVÁLIDA";
  return newErrors;
};
