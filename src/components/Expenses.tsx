import ReactApexChart from "react-apexcharts";
import { categories } from "../data/categories";
import { formattedCurrency, getAllSunForCategories } from "../helpers/others";
import { useAppManager } from "../context/AppManagerContext";

export default function Expenses() {
  const { filteredList } = useAppManager();

  const dataRecord = getAllSunForCategories(filteredList).expenseList.map(
    (record) => ({
      series: record.totalValue,
      labels: categories[record.category]?.title,
      colors: record.color,
    })
  );
  const series = dataRecord.map((item) => item.series);
  const labels = dataRecord.map((item) => item.labels);
  const colors = dataRecord.map((item) => item.colors);

  const state = {
    series: series,
    options: {
      colors: colors,
      stroke: {
        width: 1,
      },

      tooltip: {
        y: {
          formatter: function (value: number) {
            return formattedCurrency(value);
          },
        },
      },

      legend: "none",
      dataLabels: {
        style: {
          fontSize: "18px",
        },
      },

      labels: labels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 350,
            },
          },
        },
      ],
    },
  };

  const isList = filteredList.length > 0;

  return (
    <section
      className={`w-full flex flex-col items-center bg-appSecondaryColor rounded-md col-span-1
      `}
    >
      <div className="text-center p-4">GRÁFICO DE DESPESAS</div>

      {isList && (
        <ReactApexChart
          options={state.options as any}
          series={state.series}
          type="pie"
          width={350}
        />
      )}
    </section>
  );
}
