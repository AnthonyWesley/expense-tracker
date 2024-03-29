import { useRef, useState } from "react";
import MovementsList from "../components/movements/MovementsList";
import TotalPerCategories from "../components/movements/TotalPerCategories";
import G_Select from "../components/ui/G_Select";
import { useAppManager } from "../context/AppManager";
import { useReactToPrint } from "react-to-print";
import { dateHelpers } from "../helpers/DateHelpers";
import { Icon } from "@iconify/react/dist/iconify.js";
import G_Button from "../components/ui/G_Button";

const Movements = () => {
  const {
    filteredList,
    expense,
    income,
    calculateTotalsByCategory,
    currentMonth,
  } = useAppManager();
  const { expenseList, incomeList } = calculateTotalsByCategory(filteredList);
  const [isDetailed, setIsDetailed] = useState<boolean | undefined>(false);
  const contentDocument = useRef(null);

  const reactToPrint = useReactToPrint({
    content: () => contentDocument.current,
    documentTitle: `MOVIMENTAÇÕES DO MÊS DE ${dateHelpers
      .formatCurrentMonth(currentMonth)
      .toUpperCase()}`,
  });
  const selectList = (option: string) => {
    const details = {
      // TODOS: [...incomeList, ...expenseList],
      SIMPLIFICADO: false,
      DETALHADO: true,
    }[option];
    setIsDetailed(details);
  };

  return (
    <section className="w-full mx-auto rounded-lg my-16">
      <div className="text-center p-4 lg:flex-1 text-2xl">MOVIMENTAÇÕES</div>
      <main className="w-full flex items-center justify-between mb-1 bg-slate-900">
        <G_Select
          optionList={["SIMPLIFICADO", "DETALHADO"]}
          onSelect={selectList}
          className="w-44 h-14"
        />

        <G_Button
          onClick={reactToPrint}
          className="bg-blue-900 flex justify-center w-20 p-3"
          title="Baixar Relatório"
        >
          PDF <Icon icon="mdi:download" width={30} />
        </G_Button>
      </main>

      <div ref={contentDocument}>
        <TotalPerCategories total={income} color="#008000" />
        <MovementsList
          list={incomeList}
          color="#008000"
          detailed={isDetailed}
        />
        <hr className="my-2 opacity-0" />
        <TotalPerCategories total={expense} color="#ef4444" />
        <MovementsList
          list={expenseList}
          color="#ef4444"
          detailed={isDetailed}
        />
      </div>
    </section>
  );
};

export default Movements;
