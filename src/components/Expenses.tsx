import { useAppManager } from "../context/AppManagerContext";
import { categories } from "../data/categories";
import { getAllSunForCategories } from "../helpers/others";
//@ts-ignore
import CanvasJSReact from "@canvasjs/react-charts"; // Importando a biblioteca CanvasJS diretamente

export default function Expenses() {
  const { filteredList } = useAppManager();

  const CanvasJSChart = CanvasJSReact.CanvasJSChart; // Obtendo o componente Chart da biblioteca

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
    showInLegend: true,
    height: 340,
    data: [
      {
        radius: "60%",
        type: "pie",
        startAngle: 0,
        indexLabelFontColor: "white",
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
