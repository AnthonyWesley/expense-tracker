"use client";
import { useAppContext } from "@/context";
import { FormattedCurrency } from "@/helpers/dateFilter";
import { PlusCircle } from "lucide-react";
import ModalForm from "../Modal";

export default function FinancialSummary() {
  const { income, expense, handleAddEvent } = useAppContext();

  return (
    <section className="w-full bg-white rounded-lg p-2 flex flex-col justify-center">
      <div className="mb-4 text-center">
        <p>Balanço</p>

        <h1 className="text-3xl font-bold">
          {FormattedCurrency(income - expense)}
        </h1>
      </div>

      <div className="flex flex-col justify-between gap-4  ">
        <div className="flex  justify-between text-green-600 rounded-lg shadow-[0px_0px_0px_1px_rgba(0,0,0,0.20)] p-2 cursor-pointer">
          <div>
            <p>Receita</p>
            <h1 className="text-2xl font-bold">{FormattedCurrency(income)}</h1>
          </div>

          <div>
            <ModalForm
              status={"income"}
              modalName={<PlusCircle size={50} />}
              headerTitle="REGISTRO DE GANHOS"
              funcActions={{ funcOne: handleAddEvent }}
            />
          </div>
        </div>

        <div className=" flex justify-between text-red-600 rounded-lg shadow-[0px_0px_0px_1px_rgba(0,0,0,0.10)] p-2 cursor-pointer">
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
              funcTwo: () => console.log("bb"),
            }}
          />
        </div>
      </div>
    </section>
  );
}
