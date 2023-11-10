"use client";
import { useAppContext } from "@/context";
import { categories } from "@/data/categories";
import { ItemType } from "@/type/ItemType";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { FormattedCurrency } from "@/helpers/others";

export default function Expenses() {
  const { filteredList } = useAppContext();
  const categoriesArray = Object.values(categories);

  const sunCategoryValues = () => {
    let newCategory: { category: string; value: number }[] = [];

    if (filteredList) {
      filteredList.forEach((item) => {
        const { category, value } = item;

        const existingCategoryIndex = newCategory.findIndex(
          (c) => c.category === category
        );

        if (existingCategoryIndex !== -1) {
          newCategory[existingCategoryIndex].value += value;
        } else {
          newCategory.push({ category, value });
        }
      });
    }

    return newCategory;
  };

  console.log(sunCategoryValues());

  return (
    <Table className="bg-white rounded-lg">
      <TableBody className="flex flex-col justify-center items-end">
        {sunCategoryValues().map((item, index) => (
          <TableRow key={index}>
            <TableCell
              className="rounded-lg text-white w-[100px]"
              style={{ backgroundColor: categories[item.category]?.color }}
            >
              {categories[item.category].title}
            </TableCell>
            <TableCell className="w-[100px] text-red-500">
              {FormattedCurrency(item.value)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
