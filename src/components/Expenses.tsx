// import { useAppManager } from "../context/AppManagerContext";
// import { categories } from "../data/categories";
// import { getAllSunForCategories } from "../helpers/others";
// //@ts-ignore
// import CanvasJSReact from "@canvasjs/react-charts";

// export default function Expenses() {
//   const { filteredList } = useAppManager();

//   var CanvasJSChart = CanvasJSReact.CanvasJSChart;
//   const dataRecord = getAllSunForCategories(filteredList).expenseList.map(
//     (record) => ({
//       y: record.totalValue,
//       label: categories[record.category]?.title,
//       color: record.color,
//     })
//   );

//   const options = {
//     animationEnabled: true,
//     backgroundColor: "#1f2937",
//     // exportFileName: "New Year Resolutions",
//     // exportEnabled: true,
//     showInLegend: true,
//     height: 340,
//     data: [
//       {
//         radius: "60%",
//         type: "pie",
//         startAngle: 0,
//         indexLabelFontColor: "white",
//         //innerRadius: 60,
//         indexLabelFontSize: 13,
//         indexLabel: "{label} - #percent%",
//         toolTipContent: "<b>{label}:</b> {y} (#percent%)",
//         dataPoints: dataRecord,
//       },
//     ],
//   };
//   return (
//     <section className="w-full bg-appSecondaryColor rounded-md col-span-1 h-[350px] overflow-hidden">
//       <div className="text-center p-4">GRÁFICO DE DESPESAS</div>
//       <CanvasJSChart options={options} />
//     </section>
//   );
// }

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
              width: 200,
            },
          },
        },
      ],
    },
  };

  return (
    <section className="w-full flex flex-col items-center bg-appSecondaryColor rounded-md col-span-1 h-[350px] overflow-hidden">
      <div className="text-center p-4">GRÁFICO DE DESPESAS</div>
      <ReactApexChart
        options={state.options as any}
        series={state.series}
        type="pie"
        width={350}
      />
    </section>
  );
}
