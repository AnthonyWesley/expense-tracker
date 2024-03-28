import { dateHelpers } from "../../helpers/DateHelpers";
import { formattedCurrency } from "../../helpers/others";
import { CategorySummaryType } from "../../type/CategoryType";

type ListProps = {
  list: CategorySummaryType[];
  color: string;
  detailed?: boolean;
};
export default function MovementsList({ list, color, detailed }: ListProps) {
  return (
    <div>
      {list?.map((exp, index) => (
        <div key={index} className="mb-1" style={{ color: color }}>
          {detailed &&
            exp.allDescriptions.map(({ id, date, description, value }) => (
              <div
                key={id}
                className="w-full flex items-end p-[2px] border gap-2 bg-white hover:bg-slate-100 cursor-pointer"
              >
                <p className="w-[150px] ml-2">{dateHelpers.formatDate(date)}</p>
                <p className="w-full italic text-left">{description}</p>
                <p className={`w-[150px] text-right ${exp.color}`}>
                  {formattedCurrency(value)}
                </p>
              </div>
            ))}
          <div
            className={`flex justify-between items-center gap-2 bg-gray-100 font-bold p-2 text-xl ${exp.color}`}
          >
            <h1>{exp.category}</h1>
            <h1 className="">{formattedCurrency(exp.totalValue)}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
