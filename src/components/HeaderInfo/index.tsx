"use client";
import { useAppContext } from "@/context";
import { DateHelpers } from "@/helpers/DateHelpers";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeaderInfo() {
  const dateHelpers = new DateHelpers();
  const { prevMonth, nextMonth, currentMonth } = useAppContext();

  return (
    <div>
      <header className="container m-auto fixed top-0 flex justify-between items-center bg-gray-800 text-white rounded-lg p-1 z-50 lg:text-2xl">
        <div
          onClick={prevMonth}
          className="cursor-pointer hover:bg-slate-600 transition duration-300 p-4 rounded-sm"
        >
          <ChevronLeft />
        </div>
        <div>{dateHelpers.formatCurrentMonth(currentMonth).toUpperCase()}</div>
        <div
          onClick={nextMonth}
          className="cursor-pointer hover:bg-slate-600 transition duration-300 p-4 rounded-sm"
        >
          <ChevronRight />
        </div>
      </header>
    </div>
  );
}
