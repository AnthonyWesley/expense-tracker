"use client";
import { useAppContext } from "@/context";
import { categories } from "@/data/categories";
import { DateHelpers } from "@/helpers/DateHelpers";
import { formattedCurrency, getAllSunForCategories } from "@/helpers/others";

import { Chart } from "react-google-charts";

export default function Expenses() {
  const { filteredList } = useAppContext();
  const dateHelpers = new DateHelpers();
  const dataWithoutHeader = getAllSunForCategories(
    filteredList
  ).expenseList.map((item) => [
    `${categories[item.category]?.title} - ${formattedCurrency(
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
    <section className="rounded-md w-full lg:w-1/2 bg-appSecondaryColor overflow-hidden">
      <div className="text-center p-4">GRÁFICO DE DESPESAS</div>
      <div className="bg-gray-200">
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          style={{ borderRadius: 3 }}
          className="h-96 lg:relative bottom-14"
        />
      </div>
    </section>
  );
}
