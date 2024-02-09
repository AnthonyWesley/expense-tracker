import { useAppManager } from "../context/AppManagerContext";
import { categories } from "../data/categories";
import { getAllSunForCategories } from "../helpers/others";
//@ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";

export default function Expenses() {
  const { filteredList } = useAppManager();

  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const dataRecord = getAllSunForCategories(filteredList).expenseList.map(
    (record) => ({
      y: record.totalValue,
      label: categories[record.category]?.title,
      color: record.color,
    })
  );

  const options = {
    animationEnabled: true,
    backgroundColor: "#1f2937",
    // exportFileName: "New Year Resolutions",
    // exportEnabled: true,
    showInLegend: true,
    height: 340,
    data: [
      {
        radius: "60%",
        type: "pie",
        startAngle: 0,
        indexLabelFontColor: "white",
        //innerRadius: 60,
        indexLabelFontSize: 13,
        indexLabel: "{label} - #percent%",
        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
        dataPoints: dataRecord,
      },
    ],
  };
  return (
    <section className="w-full bg-appSecondaryColor rounded-md col-span-1 h-[350px] overflow-hidden">
      <div className="text-center p-4">GRÁFICO DE DESPESAS</div>
      <CanvasJSChart options={options} />
    </section>
  );
}
