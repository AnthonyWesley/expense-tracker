import { formattedText, formattedCurrency } from "../../helpers/others";
import { useAppManager } from "../../context/AppManager";
import { dateHelpers } from "../../helpers/DateHelpers";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RecordType } from "../../type/RecordType";
import { useSearchParams } from "react-router-dom";
import { useApiContext } from "../../context/ApiContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import G_Select from "../ui/G_Select";

export function RecordList({ className }: { className?: string }) {
  const { categories } = useApiContext();
  const { filteredList } = useAppManager();
  const [newList, setNewList] = useState<RecordType[]>();
  const [_, setSearchParams] = useSearchParams();
  const optionList = ["TODOS", "RECEITAS", "DESPESAS"];
  const navigate = useNavigate();

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

  const renderTableRow = (invoice: RecordType, index: number) => (
    <tr
      key={index}
      onClick={() => navigate(`/record/${invoice.id}`)}
      className="cursor-pointer bg-appSecondaryColor border border-white/10 hover:bg-appPrimaryColor"
    >
      <td className="py-2 px-4">
        {categories[invoice.category]?.expense ? (
          <Icon icon="pepicons-print:triangle-down" color="red" width={30} />
        ) : (
          <Icon icon="pepicons-print:triangle-up" color="green" width={30} />
        )}
      </td>
      <td
        className="py-2 px-4"
        style={{
          backgroundColor: categories[invoice.category]?.color,
        }}
      >
        {invoice.category}
      </td>
      <td className="py-2 px-4">{formattedText(invoice.description)}</td>
      <td
        style={{
          color: categories[invoice.category]?.expense ? "red" : "green",
        }}
      >
        {formattedCurrency(invoice.value)}
      </td>
      <td className="py-2 px-4">{dateHelpers.formatDate(invoice.date)}</td>
    </tr>
  );

  return (
    <section
      className={`min-h-[200px] lg:mi-h-[280px] w-full mb-16 bg-appSecondaryColor rounded-md overflow-hidden ${
        className || "col-span-2"
      }`}
    >
      <header className="flex items-center justify-between">
        <div className="text-center p-4 lg:flex-1">REGISTROS</div>
        <G_Select
          optionList={optionList}
          onSelect={selectList}
          className="w-40 h-14"
          // value={option}
        />
      </header>

      {filteredList.length > 0 && (
        <div
          className={`${className} overflow-y-scroll h-[200px] lg:h-[280px] `}
        >
          <table className="min-w-full bg-transparent border border-white/10">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 w-[50px]">TIPO</th>
                <th className="text-left py-2 px-4 w-[100px]">CATEGORIA</th>
                <th className="text-left py-2 px-4">DESCRIÇÃO</th>
                <th className="text-left py-2 px-4 w-[100px]">VALOR</th>
                <th className="text-left py-2 px-4 w-[100px]">DATA</th>
              </tr>
            </thead>
            <tbody>{(newList ?? filteredList)?.map(renderTableRow)}</tbody>
          </table>
        </div>
      )}
    </section>
  );
}
