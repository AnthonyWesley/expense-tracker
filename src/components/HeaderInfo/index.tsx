"use client";
import { useAppContext } from "@/context";
import { DateHelpers } from "@/helpers/DateHelpers";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeaderInfo() {
  const dateHelpers = new DateHelpers();
  const { prevMonth, nextMonth, currentMonth } = useAppContext();

  return (
    <div>
      <header className="flex justify-between items-center p-2 my-4 w-full bg-white rounded-lg">
        <div onClick={prevMonth} className="cursor-pointer">
          <ChevronLeft />
        </div>
        <p className="text-lg md:ml-8 mobile-text-lg">
          {dateHelpers.formatCurrentMonth(currentMonth)}
        </p>
        <div onClick={nextMonth} className="cursor-pointer">
          <ChevronRight />
        </div>
      </header>
    </div>
  );
}
