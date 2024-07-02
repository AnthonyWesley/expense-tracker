import { toCurrency } from "../../../helpers/others";

type TotalProps = {
  total: number;
  color: string;
};

export default function TotalPerCategories({ total, color }: TotalProps) {
  return (
    <footer
      style={{ color: color }}
      className={`bg-white flex justify-between items-center border-[.1px] border-black font-bold p-2`}
    >
      <p className="text-lx lg:text-2xl">
        TOTAL DE {color != "#22d3ee" ? "GASTOS" : "RECEITAS"}
      </p>
      <h1 className="text-2xl">{toCurrency(total)}</h1>
    </footer>
  );
}
