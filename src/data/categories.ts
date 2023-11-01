import { CategoriesType } from "@/type/CategoriesType";

export const categories: CategoriesType = {
  RECEITA: { title: "RECEITA", color: "green", expense: false },
  supermarket: { title: "MERCADO", color: "brown", expense: true },
  drugstore: { title: "FARMÁCIA", color: "crimson", expense: true },
  goods: { title: "BENS", color: "sienna", expense: true },
  personalCare: {
    title: "CUIDADO PESSOAL",
    color: "MediumSlateBlue",
    expense: true,
  },
  entertainment: { title: "ENTRETENIMENTO", color: "orange", expense: true },
  tithe: { title: "DÍZIMO", color: "lightSkyBlue", expense: true },
  investments: { title: "INVESTIMENTOS", color: "steelBlue", expense: true },
  household: { title: "CASA", color: "coral", expense: true },
  others: { title: "OUTROS", color: "darkSlateGrey", expense: true },
};
