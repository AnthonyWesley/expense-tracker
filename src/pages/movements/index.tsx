import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "../../components/Button";

import { useAppManager } from "../../context/AppManager";
import { dateHelpers } from "../../helpers/DateHelpers";
import MovementsList from "./components/MovementsList";
import TotalPerCategories from "./components/TotalPerCategories";
import Dropdown from "../../components/Dropdown";

export default function index() {
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
      SIMPLIFICADAS: false,
      DETALHADAS: true,
    }[option];
    setIsDetailed(details);
  };

  return (
    <section className="w-full mx-auto rounded-lg lg:my-14 my-16">
      <div className="text-center p-4 lg:flex-1 text-2xl">MOVIMENTAÇÕES</div>
      <main className="w-full flex items-center justify-between mb-1 bg-slate-900">
        <Dropdown
          dropdownList={["SIMPLIFICADAS", "DETALHADAS"]}
          dropdownSelect={selectList}
          className="w-52 h-14"
        />

        <Button
          onClick={reactToPrint}
          className="bg-blue-900 flex justify-center w-20 p-3"
          title="Baixar Relatório"
        >
          PDF <Icon icon="mdi:download" width={30} />
        </Button>
      </main>

      <div ref={contentDocument}>
        <TotalPerCategories total={income} color="#22d3ee" />
        <MovementsList
          list={incomeList}
          color="#22d3ee"
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
}
