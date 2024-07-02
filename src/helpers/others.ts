import { ToastType } from "../components/Toast";
import { CategoriesType } from "../type/CategoryType";

import { RecordType } from "../type/RecordType";

export const toCurrency = (currency: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(currency);
};

export const autoCurrency = (value: string | undefined) => {
  if (value) {
    return Intl.NumberFormat("pt-BR", {
      // style: "currency",
      // currency: "BRL",
      minimumFractionDigits: 2,
    }).format(parseFloat(value) / 100);
  }
  return "";
};

export const toNumber = (value: string | number) => {
  if (isNaN(value as number)) {
    return parseFloat((value as string).replace(/\./g, "").replace(/,/g, "."));
  } else {
    return value;
  }
};

export const findItemByParams = (list: RecordType[], paramsId: string) => {
  if (list && paramsId) {
    return list.find((item) => item.id == paramsId);
  }
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

  if (!date || date.toString() === "Invalid Date") {
    newErrors.push({
      message: "DATA INVÁLIDA",
      type: "error",
    });
  }

  if (!category) {
    newErrors.push({
      message: "CATEGORIA INVÁLIDA",
      type: "error",
    });
  }

  if (value.length <= 0 || value === "0,00") {
    newErrors.push({
      message: "VALOR INVÁLIDO",
      type: "error",
    });
  }

  if (description.length < 4) {
    newErrors.push({
      message: "DESCRIÇÃO INVÁLIDO",
      type: "error",
    });
  }

  // Add each error as an alert

  return newErrors;
};
