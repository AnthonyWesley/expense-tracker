"use client";
import { useAppContext } from "@/context";
import {
  ArrowDownFromLine,
  ArrowUpFromLine,
  DollarSign,
  PlusCircle,
} from "lucide-react";
import ModalForm from "../Modal";
import { FormattedCurrency } from "@/helpers/others";

export default function FinancialSummary() {
  const { income, expense, handleAddEvent } = useAppContext();

  return (
    <section className="w-full col-span-2 col-start-1 row-start-2 bg-gray-200 rounded-lg p-2 flex flex-col justify-center">
      <div className="flex flex-col justify-between gap-3">
        <div className="flex justify-between items-center bg-white  text-green-600 rounded-lg shadow-[0px_0px_0px_1px_rgba(0,0,0,0.20)] p-2">
          <ArrowDownFromLine color="green" size={30} />
          <div>
            <p>Receitas</p>
            <h1 className="text-2xl font-bold">{FormattedCurrency(income)}</h1>
          </div>

          <ModalForm
            status={"income"}
            modalName={<PlusCircle size={50} />}
            headerTitle="REGISTRO DE GANHOS"
            funcActions={{ funcOne: handleAddEvent }}
          />
        </div>

        <div className=" flex justify-between items-center bg-white  text-red-600 rounded-lg shadow-[0px_0px_0px_1px_rgba(0,0,0,0.10)] p-2">
          <ArrowUpFromLine color="red" size={30} />
          <div>
            <p>Despesas</p>
            <h1 className="text-2xl font-bold ">
              {FormattedCurrency(expense)}
            </h1>
          </div>

          <ModalForm
            status={"expense"}
            modalName={<PlusCircle size={50} />}
            headerTitle="REGISTRO DE GASTOS"
            funcActions={{
              funcOne: handleAddEvent,
            }}
          />
        </div>

        <div className=" flex justify-between items-center bg-blue-950  text-white rounded-lg shadow-[0px_0px_0px_1px_rgba(0,0,0,0.10)] p-2">
          <DollarSign size={30} />

          <div className="text-center">
            <p>Balanço</p>
            <h1 className="text-3xl font-bold">
              {FormattedCurrency(income - expense)}
            </h1>
          </div>
          <DollarSign size={30} />
        </div>
      </div>
    </section>
  );
}
