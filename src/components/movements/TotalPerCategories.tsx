import { formattedCurrency } from "../../helpers/others";

type TotalProps = {
  total: number;
  color: string;
};

export default function TotalPerCategories({ total, color }: TotalProps) {
  return (
    <footer
      style={{ backgroundColor: color }}
      className={`flex justify-between items-center text-white font-bold p-2`}
    >
      <p className="text-lx lg:text-2xl">
        TOTAL DE {color != "#008000" ? "GASTOS" : "RECEITAS"}
      </p>
      <h1 className="text-2xl">{formattedCurrency(total)}</h1>
    </footer>
  );
}
