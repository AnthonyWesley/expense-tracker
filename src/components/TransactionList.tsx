import { ArrowUpFromLine, ArrowDownFromLine } from "lucide-react";
import { categories } from "../data/categories";
import { formattedText, formattedCurrency } from "../helpers/others";
import { useAppManager } from "../context/AppManagerContext";
import { dateHelpers } from "../helpers/DateHelpers";
import { useNavigate } from "react-router-dom";
import G_Select from "./generics/G_Select";
import { useState } from "react";
import { RecordType } from "../type/RecordType";

export function TransactionList({ className }: { className?: string }) {
  const { filteredList } = useAppManager();
  const navigate = useNavigate();
  const [newList, setNewList] = useState<RecordType[]>();
  const optionList = ["TODOS", "RECEITAS", "DESPESAS"];

  const selectList = (option: string) => {
    switch (option) {
      case "TODOS":
        setNewList(filteredList);
        break;
      case "RECEITAS":
        setNewList(
          filteredList.filter((item) => !categories[item?.category]?.expense)
        );
        break;
      case "DESPESAS":
        setNewList(
          filteredList.filter((item) => categories[item?.category]?.expense)
        );
        break;
      default:
        break;
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
          <ArrowUpFromLine color="red" />
        ) : (
          <ArrowDownFromLine color="green" />
        )}
      </td>
      <td
        className="py-2 px-4"
        style={{ backgroundColor: categories[invoice.category]?.color }}
      >
        {categories[invoice.category]?.title}
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
      className={`w-full mb-16 bg-appSecondaryColor rounded-md overflow-hidden ${
        className || "col-span-3"
      }`}
    >
      <header className="flex items-center justify-between">
        <div className="text-center p-4 lg:flex-1">MOVIMENTAÇÕES</div>
        <G_Select optionList={optionList} onSelect={selectList} />
      </header>

      {filteredList.length > 0 && (
        <div className={`${className || "h-[290px]"} overflow-y-scroll`}>
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
