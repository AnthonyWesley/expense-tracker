"use client";
import { useAppContext } from "@/context";
import { categories } from "@/data/categories";
import { DateHelpers } from "@/helpers/DateHelpers";
import { FormattedCurrency, getAllSunForCategories } from "@/helpers/others";

import { Chart } from "react-google-charts";

export default function Expenses() {
  const { filteredList } = useAppContext();
  const dateHelpers = new DateHelpers();
  const dataWithoutHeader = getAllSunForCategories(
    filteredList
  ).expenseList.map((item) => [
    `${categories[item.category]?.title} - ${FormattedCurrency(
      item.totalValue
    )}`,
    // FormattedCurrency(item.totalValue),
    item.totalValue,
  ]);

  const data = [["Task", "Hours per Day"], ...dataWithoutHeader];
  const options = {
    backgroundColor: "transparent",
    tooltip: { text: "percentage" },
    legend: {
      position: "none",
    },

    slices: getAllSunForCategories(filteredList).expenseList.map((item) => ({
      color: item.color,
    })),
  };

  return (
    <div className="rounded-lg w-full sm:w-1/2">
      <div className="h-12  bg-gray-200 flex items-center p-2">
        GRAFICO DE DESPESAS
      </div>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        style={{ backgroundColor: "white", height: 208 }}
      />
    </div>
  );
}
