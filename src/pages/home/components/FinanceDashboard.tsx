import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppManager } from "../../../context/AppManager";
import { toCurrency } from "../../../helpers/others";
import Modal from "../../../components/Modal";
import RecordCreate from "./RecordCreate";

export default function FinanceDashboard() {
  const { income, expense } = useAppManager();

  return (
    <>
      <div className="flex flex-col gap-1 w-full h-full">
        <div className="h-1/3 flex flex-col justify-center items-center font-semibold bg-white/5 p-2 rounded-sm">
          <div className="h-1/3 flex flex-col justify-center items-start">
            <p className="text-[12px] text-white opacity-25 h-4">RECEITAS</p>
            <h1 className="text-3xl text-cyan-400">{toCurrency(income)}</h1>
          </div>
        </div>

        <div className="h-1/3 flex flex-col justify-center items-center font-semibold bg-white/5 p-2 rounded-sm">
          <div className="h-1/3 flex flex-col justify-center items-start">
            <p className="text-[12px] text-white opacity-25 h-4">DESPESAS</p>
            <h1 className="text-3xl text-rose-600"> {toCurrency(expense)}</h1>
          </div>
        </div>

        <div className="h-1/3 flex flex-col justify-center items-center font-semibold bg-white/5 p-2 rounded-sm">
          <div className="h-1/3 flex flex-col justify-center items-start">
            <p className="text-[12px] text-white opacity-25 h-4">BALANÇO</p>
            <h1 className="text-3xl text-white">
              {toCurrency(income - expense)}
            </h1>
          </div>
        </div>
      </div>
      <div className="absolute bg-slate-700/90 rounded-full h-20 w-20 hover:h-24 hover:w-24 transition-all hover:bg-slate-700 flex justify-center mr-2">
        <Modal icon={<Icon icon="heroicons:plus-small" width={70} />}>
          <RecordCreate />
        </Modal>
      </div>
    </>
  );
}
