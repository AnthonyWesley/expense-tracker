import { useAppManager } from "../context/AppManagerContext";
import { dateHelpers } from "../helpers/DateHelpers";
import { getAllSunForCategories, formattedCurrency } from "../helpers/others";
import { categories } from "../data/categories";

export default function Detailed() {
  const { filteredList, expense } = useAppManager();

  // const navigate = useNavigate();

  return (
    <section className="w-full mx-auto rounded-lg my-16 text-appSecondaryColor">
      {getAllSunForCategories(filteredList).expenseList.map((exp, index) => (
        <div key={index} className="my-1">
          <header
            style={{ backgroundColor: exp.color }}
            className="text-white p-4 rounded-sm font-semibold"
          >
            {categories[exp.category].title}
          </header>
          <main>
            {exp.allDescriptions.map(({ id, date, description, value }) => (
              <div
                key={id}
                className="w-full flex p-2 border gap-4 bg-gray-100 hover:bg-slate-200 cursor-pointer"
              >
                <p className="w-[100px]">{dateHelpers.formatDate(date)}</p>
                <p className="w-full italic text-left">{description}</p>
                <p className="w-[100px] text-red-500">
                  {formattedCurrency(value)}
                </p>
              </div>
            ))}
          </main>
        </div>
      ))}

      <footer className="flex flex-col items-end bg-red-700 text-white font-bold p-4">
        <p className="text-xs">TOTAL DE GASTOS DO MÊS</p>
        <h1 className="text-4xl">{formattedCurrency(expense)}</h1>
      </footer>
    </section>
  );
}
