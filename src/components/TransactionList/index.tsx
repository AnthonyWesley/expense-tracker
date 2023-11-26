"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppContext } from "@/context";
import { categories } from "@/data/categories";
import { DateHelpers } from "@/helpers/DateHelpers";
import { FormattedCurrency, formattedText } from "@/helpers/others";
import { ArrowDownFromLine, ArrowUpFromLine } from "lucide-react";
import Link from "next/link";

import { useRouter } from "next/navigation";

export function TransactionList() {
  const dateHelpers = new DateHelpers();
  const { filteredList } = useAppContext();
  const router = useRouter();

  return (
    <>
      <Table className="bg-white rounded-lg">
        <TableHeader>
          <TableRow className="bg-gray-200 ">
            <TableHead className="w-[100px]">TIPO</TableHead>
            <TableHead className="w-[100px]">CATEGORIA</TableHead>
            <TableHead>DESCRIÇÃO</TableHead>
            <TableHead className="w-[100px]">VALOR</TableHead>
            <TableHead className="text-right w-[200px]">DATA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredList.map((invoice, index) => (
            <TableRow
              key={index}
              onClick={() => router.push(`/record/${invoice.id}`)}
              className="cursor-pointer"
            >
              <TableCell className="font-medium">
                {(categories[invoice.category]?.expense && (
                  <ArrowUpFromLine color="red" />
                )) || <ArrowDownFromLine color="green" />}
              </TableCell>
              <TableCell
                className="text-white font-bold rounded-lg"
                style={{ backgroundColor: categories[invoice.category]?.color }}
              >
                {categories[invoice.category]?.title}
              </TableCell>
              <TableCell>{formattedText(invoice.title)}</TableCell>
              <TableCell
                style={{
                  color: categories[invoice.category]?.expense
                    ? "red"
                    : "green",
                }}
              >
                {FormattedCurrency(invoice.value)}
              </TableCell>
              <TableCell className="text-right">
                {dateHelpers.formatDate(invoice.date)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        {/* <Link href={`/record`} className="text-white text-center">
          Movimentações.
        </Link> */}
      </Table>
    </>
  );
}
