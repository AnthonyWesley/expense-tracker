"use client";

import GenericButton from "@/components/GenericButton";
import { TableBody, TableRow, TableCell, Table } from "@/components/ui/table";
import { useAppContext } from "@/context";
import { categories } from "@/data/categories";
import { DateHelpers } from "@/helpers/DateHelpers";
import { FormattedCurrency, getAllSunForCategories } from "@/helpers/others";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DetailedRecord() {
  const { filteredList, income, expense } = useAppContext();
  const dateHelpers = new DateHelpers();
  const router = useRouter();

  return (
    <div className="container  mx-auto rounded-lg mb-16">
      {getAllSunForCategories(filteredList).expenseList.map((item, index) => (
        <div key={index} className="bg-white my-2 rounded-lg">
          <div
            style={{ backgroundColor: item.color }}
            className="h-12 px-4 text-white text-left font-semibold flex items-center"
          >
            {categories[item.category].title}
          </div>
          <Table>
            <TableBody>
              {item.allDescriptions.map(({ date, title, value, id }, index) => (
                <TableRow
                  key={index}
                  onClick={() => router.push(`/record/${id}`)}
                  className="cursor-pointer"
                >
                  <TableCell className="w-[100px]">
                    {dateHelpers.formatDate(date)}
                  </TableCell>
                  <TableCell className="w-full italic text-left">
                    {title}
                  </TableCell>
                  <TableCell className="w-[100px] text-red-500">
                    {FormattedCurrency(value)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-50">
                <TableCell className=""></TableCell>
                <TableCell className="w-[200px] sm:text-xl font-semibold underline underline-offset-4">
                  TOTAL DE {categories[item.category].title}
                </TableCell>
                <TableCell className="w-[100px] text-xl text-red-500 font-semibold underline underline-offset-4">
                  {FormattedCurrency(item.totalValue)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ))}
      <div className="bg-red-500 my-2 rounded-lg p-4 text-white font-semibold flex items-center justify-between">
        <div onClick={() => router.push("/")}>
          <GenericButton tailwind="bg-white text-black">
            <MoveLeft size={21} color="black" />
          </GenericButton>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p>TOTAL DE GASTOS DO MÊS</p>
          <h1 className="text-4xl"> {FormattedCurrency(expense)}</h1>
        </div>
      </div>
    </div>
  );
}
