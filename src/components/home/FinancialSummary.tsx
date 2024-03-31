import { formattedCurrency } from "../../helpers/others";
import { useAppManager } from "../../context/AppManager";
import G_Modal from "../ui/G_Modal";
import { useRecordStore } from "../../store/useRecordStore";
import { dateHelpers } from "../../helpers/DateHelpers";
import { useApiContext } from "../../context/ApiContext";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function FinancialSummary() {
  const { income, expense } = useAppManager();
  const { apiCreateRecord } = useApiContext();
  const { description, value, category, date } = useRecordStore();

  return (
    <section className="bg-appSecondaryColor items-center p-2 col-span-2 grid grid-cols-1 gap-0.5 overflow-hidden rounded-lg text-center sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex flex-col bg-white/5 lg:py-24 py-4">
        <dt className="text-sm font-semibold leading-6 text-gray-300">
          RECEITAS
        </dt>
        <dd className="order-first text-2xl font-semibold tracking-tight text-green-600">
          {formattedCurrency(income)}
        </dd>
      </div>
      <div className="flex flex-col bg-white/5 lg:py-24 py-4">
        <dt className="text-sm font-semibold leading-6 text-gray-300">
          DESPESAS
        </dt>
        <dd className="order-first text-2xl font-semibold tracking-tight text-red-600">
          {formattedCurrency(expense)}
        </dd>
      </div>
      <div className="flex flex-col bg-white/5 lg:py-24 py-4">
        <dt className="text-sm font-semibold leading-6 text-gray-300">
          BALANÇO
        </dt>
        <dd className="order-first text-2xl font-semibold tracking-tight text-white">
          {formattedCurrency(income - expense)}
        </dd>
      </div>
      <div className="flex flex-col bg-white/5 lg:py-20">
        <dd className="order-first text-2xl font-semibold tracking-tight text-white">
          <G_Modal
            modalName={<Icon icon="heroicons:plus-small" width={48} />}
            className="text-sm p-5 text-blue-900 hover:bg-gray-950"
            funcActions={{
              funcOne: async () =>
                await apiCreateRecord({
                  date: dateHelpers.newDateAdjusted(date),
                  category: category,
                  description: description,
                  value: parseFloat(value),
                }),
            }}
          />
        </dd>
      </div>
    </section>
  );
}
