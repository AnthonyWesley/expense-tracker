"use client";
import { useAppContext } from "@/context";
import { DateHelpers } from "@/helpers/DateHelpers";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeaderInfo() {
  const dateHelpers = new DateHelpers();
  const { prevMonth, nextMonth, currentMonth } = useAppContext();

  return (
    <header className="w-full fixed top-0 left-0 bg-appSecondaryColor rounded-lg p-1 z-50 lg:text-2xl">
      <div className="container flex justify-between items-center">
        <div
          onClick={prevMonth}
          className="cursor-pointer hover:bg-appPrimaryColor transition duration-300 p-4 rounded-sm"
        >
          <ChevronLeft />
        </div>
        <div>{dateHelpers.formatCurrentMonth(currentMonth).toUpperCase()}</div>
        <div
          onClick={nextMonth}
          className="cursor-pointer hover:bg-appPrimaryColor transition duration-300 p-4 rounded-sm"
        >
          <ChevronRight />
        </div>
      </div>
    </header>
  );
}
