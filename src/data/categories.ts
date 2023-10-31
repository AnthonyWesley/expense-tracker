import { CategoriesType } from "@/type/CategoriesType";

export const categories: CategoriesType = {
  RECEITA: { title: "RECEITA", color: "green", expense: false },
  supermarket: { title: "MERCADO", color: "brown", expense: true },
  clothing: { title: "ROUPAS", color: "pink", expense: true },
  entertainment: { title: "ENTRETENIMENTO", color: "purple", expense: true },
  fastFood: { title: "LANCHES", color: "orange", expense: true },
  tithe: { title: "DÍZIMO", color: "blue", expense: true },
  others: { title: "OUTROS", color: "grey", expense: true },
};
