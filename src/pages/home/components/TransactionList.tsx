import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useApiContext } from "../../../context/ApiContext";
import { useAppManager } from "../../../context/AppManager";
import { RecordType } from "../../../type/RecordType";
import { TransactionTableHeader } from "./TransactionTableHeader";
import { TransactionTableRow } from "./TransactionTableRow";
import { TransactionFilter } from "./TransactionFilter";

export function TransactionList({ className }: { className?: string }) {
  const { categories } = useApiContext();
  const { filteredList, walletBalance } = useAppManager();
  const [newList, setNewList] = useState<RecordType[]>();
  const [_, setSearchParams] = useSearchParams();
  const optionList = ["TODOS", "RECEITAS", "DESPESAS"];

  useEffect(() => {
    setNewList(filteredList);
    setSearchParams({ option: "TODOS" });
  }, [walletBalance]);

  const selectList = (option: string) => {
    const actions: { [key: string]: () => void } = {
      TODOS: () => {
        setSearchParams({ option: "TODOS" });
        setNewList(filteredList);
      },
      RECEITAS: () => {
        setSearchParams({ option: "RECEITAS" });
        setNewList(
          filteredList.filter((item) => !categories[item?.category]?.expense)
        );
      },
      DESPESAS: () => {
        setSearchParams({ option: "DESPESAS" });
        setNewList(
          filteredList.filter((item) => categories[item?.category]?.expense)
        );
      },
    };

    const action = actions[option];
    if (action) {
      action();
    }
  };

  return (
    <>
      <TransactionFilter optionList={optionList} selectList={selectList} />
      {filteredList.length > 0 && (
        <div
          className={`${className} overflow-y-scroll h-[280px] lg:h-[280px] `}
        >
          <table className="min-w-full bg-transparent border border-white/10">
            <TransactionTableHeader />
            <tbody>
              {newList?.map((invoice, index) => (
                <TransactionTableRow
                  key={index}
                  invoice={invoice}
                  categories={categories}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
