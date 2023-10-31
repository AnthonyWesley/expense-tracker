"use client";
import { useAppContext } from "@/context";
import { formatCurrentMonth } from "@/helpers/dateFilter";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeaderInfo() {
  const { prevMonth, nextMonth, currentMonth } = useAppContext();

  return (
    <header className="flex justify-between items-center p-2 w-full  bg-white rounded-lg">
      {/* <p className="text-lg">Nome: João da Silva</p> */}
      <div onClick={prevMonth} className="cursor-pointer">
        <ChevronLeft />
      </div>
      <p className="text-lg md:ml-8 mobile-text-lg">
        {formatCurrentMonth(currentMonth)}
      </p>
      <div onClick={nextMonth} className="cursor-pointer">
        <ChevronRight />
      </div>
    </header>
  );
}
