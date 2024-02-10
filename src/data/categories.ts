import { CategoriesType } from "../type/CategoriesType";

export const categories: CategoriesType = {
  RECEITA: { title: "RECEITA", color: "green", expense: false },
  supermarket: { title: "MERCADO", color: "#dc2626", expense: true },
  // drugstore: { title: "FARMÁCIA", color: "crimson", expense: true },
  goods: { title: "BENS", color: "#b45309", expense: true },
  care: {
    title: "CUIDADO PESSOAL",
    color: "#9333ea",
    expense: true,
  },
  entertainment: { title: "ENTRETENIMENTO", color: "#f59e0b", expense: true },
  tithe: { title: "DÍZIMO", color: "#0ea5e9", expense: true },
  investments: { title: "INVESTIMENTOS", color: "#059669", expense: true },
  household: { title: "CASA", color: "#e11d48", expense: true },
  others: { title: "OUTROS", color: "#134e4a", expense: true },
};
