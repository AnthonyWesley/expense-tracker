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
    <section className="w-full bg-gray-200 rounded-lg flex flex-col justify-center">
      <div className="flex flex-col justify-between gap-2 h-52 m-2 lg:text-3xl lg:flex-row ">
        <div className="w-full flex justify-evenly items-center bg-white text-green-600 rounded-lg shadow-[0px_0px_0px_1px_rgba(0,0,0,0.20)] p-2">
          <ArrowDownFromLine color="green" size={40} />
          <div>
            <p>Receitas</p>
            <h1 className="font-bold">{FormattedCurrency(income)}</h1>
          </div>

          <ModalForm
            status={"income"}
            modalName={<PlusCircle size={50} />}
            headerTitle="REGISTRO DE GANHOS"
            funcActions={{ funcOne: handleAddEvent }}
          />
        </div>

        <div className="w-full flex justify-evenly items-center bg-white  text-red-600 rounded-lg shadow-[0px_0px_0px_1px_rgba(0,0,0,0.10)] p-2">
          <ArrowUpFromLine color="red" size={40} />
          <div>
            <p>Despesas</p>
            <h1 className="font-bold ">{FormattedCurrency(expense)}</h1>
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

        <div className="w-full flex justify-evenly items-center bg-blue-950  text-white rounded-lg shadow-[0px_0px_0px_1px_rgba(0,0,0,0.10)] p-2">
          <DollarSign size={40} />

          <div className="text-center">
            <p>Balanço</p>
            <h1 className=" font-bold">
              {FormattedCurrency(income - expense)}
            </h1>
          </div>
          <DollarSign size={40} />
        </div>
      </div>
    </section>
  );
}
