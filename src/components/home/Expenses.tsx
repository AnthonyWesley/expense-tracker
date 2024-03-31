import ReactApexChart from "react-apexcharts";
import { formattedCurrency } from "../../helpers/others";
import { useAppManager } from "../../context/AppManager";
import { useSearchParams } from "react-router-dom";
import { useApiContext } from "../../context/ApiContext";

export default function Expenses() {
  const { filteredList, income, expense, calculateTotalsByCategory } =
    useAppManager();
  const { categories } = useApiContext();
  const [searchParams] = useSearchParams();
  const option = searchParams.get("option");

  const allRecords = [
    {
      allDescriptions: [],
      category: "",
      color: "#008000",
      totalValue: income,
    },
    {
      allDescriptions: [],
      category: "",
      color: "#ff0000",
      totalValue: expense,
    },
  ];

  const getListForOptions =
    option === "RECEITAS"
      ? calculateTotalsByCategory(filteredList).incomeList
      : option === "DESPESAS"
      ? calculateTotalsByCategory(filteredList).expenseList
      : allRecords;

  const dataRecord = getListForOptions.map((record) => ({
    series: record.totalValue,
    labels: categories[record.category]?.title,
    colors: record.color,
  }));
  const series = dataRecord.map((item) => item.series);
  const labels = dataRecord.some((item) => item.labels === undefined)
    ? ["Receitas", "Despesas"]
    : dataRecord.map((item) => item.labels);
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
      className={`w-full h-[335px] flex flex-col items-center bg-appSecondaryColor rounded-md col-span-1
      `}
    >
      <div className="text-center p-4">GRÁFICO</div>

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
