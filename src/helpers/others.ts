import { ToastType } from "../components/generics/Toast";
import { CategoriesType } from "../type/CategoryType";

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
  const newErrors: ToastType[] = [];
  if (!date)
    newErrors.push({
      message: `DATA INVÁLIDA"`,
    });

  if (!category)
    newErrors.push({
      message: `CATEGORIA INVÁLIDA"`,
    });

  if (!Number(value))
    newErrors.push({
      message: `VALOR INVÁLIDO"`,
    });
  if (description.length < 4)
    newErrors.push({
      message: `DESCRIÇÃO INVÁLIDO"`,
    });
  return newErrors;
};
