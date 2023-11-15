"use client";
import { useAppContext } from "@/context";
import { categories } from "@/data/categories";
import { FormattedCurrency } from "@/helpers/others";

import { Chart } from "react-google-charts";

export default function Expenses() {
  const { filteredList } = useAppContext();
  const categoriesArray = Object.values(categories);

  const sunCategoryValues = () => {
    let newCategory: { category: string; value: number; color: string }[] = [];

    if (filteredList) {
      filteredList.forEach((item) => {
        const { category, value } = item;

        const existingCategoryIndex = newCategory.findIndex(
          (c) => c.category === category
        );

        if (existingCategoryIndex !== -1) {
          newCategory[existingCategoryIndex].value += value;
        } else {
          newCategory.push({
            category: item.category,
            value,
            color: categories[item.category].color,
          });
        }
      });
    }

    return newCategory;
  };

  const dataWithoutHeader = sunCategoryValues().map((item) => [
    `${categories[item.category].title} - ${FormattedCurrency(item.value)}`,
    // FormattedCurrency(item.value),
    item.value,
  ]);

  const data = [["Task", "Hours per Day"], ...dataWithoutHeader];
  const options = {
    height: 420,
    tooltip: { text: "percentage" },
    legend: {
      position: "none",
    },

    slices: sunCategoryValues().map((item) => ({
      color: item.color,
    })),
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      // height={"400px"}
    />
  );
}
