"use client";
import { useAppContext } from "@/context";
import { categories } from "@/data/categories";

export default function Expenses() {
  const { filteredList } = useAppContext();
  const categoriesArray = Object.values(categories);

  return (
    <section className="w-full bg-white rounded-lg p-2">
      <h2 className="text-xl font-semibold">Categorias</h2>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-1 w-3 h-3 border">O</div>
        <div className="col-span-2">
          {filteredList.map((item, index) => (
            <p key={index}>{item.category}</p>
          ))}
        </div>
        {/* <p className="text-2xl font-bold">R$ 250.00</p> */}
      </div>
    </section>
  );
}
