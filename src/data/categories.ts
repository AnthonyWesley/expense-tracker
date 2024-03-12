import { CategoriesType } from "../type/CategoriesType";

export const categories: CategoriesType = {
  // Income
  salary: { title: "SALÁRIO", color: "#10b981", expense: false },
  bonuses: { title: "BONIFICAÇÃO", color: "#84cc16", expense: false },
  otherIncome: { title: "OUTRAS RECEITAS", color: "#14b8a6", expense: false },

  //Expenses
  supermarket: { title: "MERCADO", color: "#f43f5e", expense: true },
  goods: { title: "BENS", color: "#b45309", expense: true },
  care: {
    title: "CUIDADO PESSOAL",
    color: "#9333ea",
    expense: true,
  },
  entertainment: { title: "ENTRETENIMENTO", color: "#f59e0b", expense: true },
  tithe: { title: "DÍZIMO", color: "#0ea5e9", expense: true },
  investments: { title: "INVESTIMENTOS", color: "#059669", expense: true },
  household: { title: "CASA", color: "#86198f", expense: true },
  otherExpense: { title: "OUTRAS DESPESAS", color: "#134e4a", expense: true },
};
