import { useNavigate } from "react-router-dom";
import { dateHelpers } from "../../../helpers/DateHelpers";
import { toCurrency } from "../../../helpers/others";
import { CategorySummaryType } from "../../../type/CategoryType";

type ListProps = {
  list: CategorySummaryType[];
  color: string;
  detailed?: boolean;
};
export default function MovementsList({ list, color, detailed }: ListProps) {
  const navigate = useNavigate();

  return (
    <div>
      {list?.map((exp, index) => (
        <div
          key={index}
          className={`bg-white w-full
           flex items-center justify-between 
            ${detailed ? "flex-col mb-4 " : "flex-row "}
          }`}
          style={{ color: "black" }}
        >
          <h1 className="px-3 font-semibold text-lg self-start border-b w-full">
            {exp.category}
          </h1>

          {detailed &&
            exp.allDescriptions.map(
              ({ id, date, description, value }, index) => (
                <div
                  key={id}
                  onClick={() => navigate(`/record/${id}`)}
                  style={{
                    backgroundColor: index % 2 === 0 ? "white" : "#f4f4f5",
                  }}
                  className="w-full flex items-end px-4 b
                   gap-2 hover:bg-slate-100 cursor-pointer"
                >
                  <p className="w-[150px] ml-2">
                    {dateHelpers.formatDate(date)}
                  </p>
                  <p className="w-full italic text-left">{description}</p>
                  <p
                    className={`w-[150px] text-right`}
                    style={{ color: color }}
                  >
                    {toCurrency(value)}
                  </p>
                </div>
              )
            )}

          <h1
            style={{ color: color, borderColor: detailed ? color : "" }}
            className={`px-3 font-semibold text-lg self-end text-right w-32 border-t`}
          >
            {toCurrency(exp.totalValue)}
          </h1>
        </div>
      ))}
    </div>
  );
}
