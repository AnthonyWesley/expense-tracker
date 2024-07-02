import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import { dateHelpers } from "../../../helpers/DateHelpers";
import { formattedText, toCurrency } from "../../../helpers/others";
import { RecordType } from "../../../type/RecordType";

interface TransactionTableRowProps {
  invoice: RecordType;
  categories: { [key: string]: any };
}

export function TransactionTableRow({
  invoice,
  categories,
}: TransactionTableRowProps) {
  const navigate = useNavigate();

  return (
    <tr
      onClick={() => navigate(`/record/${invoice.id}`)}
      className="cursor-pointer border border-white/10 hover:bg-gray-700"
    >
      <td className="py-2 px-4">
        {categories[invoice.category]?.expense ? (
          <Icon
            icon="pepicons-print:triangle-down"
            color="#e11d48"
            width={30}
          />
        ) : (
          <Icon icon="pepicons-print:triangle-up" color="#22d3ee" width={30} />
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
          color: categories[invoice.category]?.expense ? "#e11d48" : "#22d3ee",
        }}
      >
        {toCurrency(invoice.value)}
      </td>
      <td className="py-2 px-4">{dateHelpers.formatDate(invoice.date)}</td>
    </tr>
  );
}
