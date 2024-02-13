import { useAppManager } from "../context/AppManagerContext";
import { dateHelpers } from "../helpers/DateHelpers";
import {
  getAllSunForCategories,
  formattedCurrency,
  NewList,
} from "../helpers/others";
import { categories } from "../data/categories";
import { useState } from "react";
import G_Select from "../components/generics/G_Select";

export default function Detailed() {
  const { filteredList, expense, income } = useAppManager();
  const [newList, setNewList] = useState<NewList[] | undefined>();
  const { expenseList, incomeList } = getAllSunForCategories(filteredList);
  const hasGreenColor = (newList ?? expenseList)[0]?.color !== "green";

  const selectList = (option: string) => {
    setNewList(
      option === "RECEITAS"
        ? incomeList
        : option === "DESPESAS"
        ? expenseList
        : undefined
    );
  };

  return (
    <section className="w-full mx-auto rounded-lg my-20 text-appSecondaryColor">
      <main className="flex items-center justify-between bg-slate-900">
        <div className="text-center text-gray-50 p-4 lg:flex-1">
          MOVIMENTAÇÕES DETALHADAS
        </div>

        <G_Select optionList={["DESPESAS", "RECEITAS"]} onSelect={selectList} />
      </main>
      {(newList ?? expenseList)?.map((exp, index) => (
        <div key={index} className="my-1">
          <header className="bg-gray-400 flex justify-between p-4 rounded-sm font-semibold">
            {categories[exp.category].title}
            <span
              style={{ backgroundColor: exp.color }}
              className="rounded-full py-2 px-8"
            ></span>
          </header>
          <div>
            {exp.allDescriptions.map(({ id, date, description, value }) => (
              <div
                key={id}
                className="w-full flex p-2 border gap-4 bg-gray-100 hover:bg-slate-200 cursor-pointer"
              >
                <p className="w-[100px]">{dateHelpers.formatDate(date)}</p>
                <p className="w-full italic text-left">{description}</p>
                <p
                  className={`w-[100px] ${
                    hasGreenColor ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {formattedCurrency(value)}
                </p>
              </div>
            ))}
            <div
              className={`flex justify-end items-center gap-2 bg-gray-300 font-bold p-3 text-xl ${
                hasGreenColor ? "text-red-600" : "text-green-600"
              }`}
            >
              <p className="">TOTAL:</p>
              <h1 className="">{formattedCurrency(exp.totalValue)}</h1>
            </div>
          </div>
        </div>
      ))}
      <footer
        className={`flex flex-col items-end bg-red-700 text-white font-bold p-4 ${
          hasGreenColor ? "bg-red-700" : "bg-green-700"
        }`}
      >
        <p className="text-xs">
          TOTAL DE {!hasGreenColor ? "RECEITAS" : "GASTOS"} DO MÊS
        </p>

        <h1 className="text-4xl">
          {hasGreenColor
            ? formattedCurrency(expense)
            : formattedCurrency(income)}
        </h1>
      </footer>
    </section>
  );
}
