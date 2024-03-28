import { useRef, useState } from "react";
import MovementsList from "../components/movements/MovementsList";
import TotalPerCategories from "../components/movements/TotalPerCategories";
import G_Select from "../components/ui/G_Select";
import { useAppManager } from "../context/AppManager";
import { useReactToPrint } from "react-to-print";
import { dateHelpers } from "../helpers/DateHelpers";
import { Icon } from "@iconify/react/dist/iconify.js";

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
      SIMPES: false,
      DETALHADO: true,
    }[option];
    setIsDetailed(details);
  };

  console.log(dateHelpers.getCurrentMonth());

  return (
    <section className="w-full mx-auto rounded-lg my-16">
      <div className="text-center text-gray-50 p-4 lg:flex-1 text-2xl">
        MOVIMENTAÇÕES
      </div>
      <main className="flex items-center justify-between bg-slate-900 mb-1">
        <G_Select
          optionList={["SIMPLES", "DETALHADO"]}
          onSelect={selectList}
          className="w-40 h-14"
        />

        <div
          onClick={reactToPrint}
          className="ml-2 p-3 flex items-center gap-2 bg-blue-800"
        >
          PDF <Icon icon="mdi:download" width={30} />
        </div>
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
