import { categories } from "@/data/categories";
import { handleRefValues, newDateAdjusted } from "@/helpers/dateFilter";
import { ItemType } from "@/type/ItemType";
import { RefsType } from "@/type/RefsType";
import { useEffect, useRef, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { useRouter } from "next/navigation";

export default function useAddData() {
  const [list, setList] = useState<ItemType[]>([]);
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const router = useRouter();

  const { v4: uuidv4 } = require("uuid");

  const refs: RefsType = {
    titleRef: useRef(null),
    valueRef: useRef(null),
    categoryRef: useRef(null),
    dateRef: useRef(null),
  };
  let categoryKeys: string[] = Object.keys(categories);

  const handleAddItem = (item: ItemType) => {
    let newList = [...list];
    newList.push(item);
    setList(newList);
    setLocalStorage(newList);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Deseja deletar seu registro?")) {
      router.push("/");
      const newList = list.filter((item) => item?.id !== id);
      setList(newList);
      setLocalStorage(newList);
    }
  };

  const handleEditItem = (id: string, updatedItem: ItemType) => {
    const updatedList = list.map((item) => {
      if (item.id === id) {
        return { ...item, ...updatedItem };
      }
      return item;
    });

    setList(updatedList);
    setLocalStorage(updatedList);
  };

  const handleAddEvent = () => {
    let errors: string[] = [];
    const titleValue = (refs.titleRef.current as HTMLInputElement).value;
    const valueValue = (refs.valueRef.current as HTMLInputElement).value;
    const categoryValue = refs.categoryRef.current as HTMLInputElement;
    const dateValue = (refs.dateRef.current as HTMLInputElement).value;

    if (isNaN(new Date(dateValue).getTime())) {
      errors.push("Data inválida!");
    }
    if (!categoryKeys.includes(handleRefValues(categoryValue) as string)) {
      errors.push("Categoria inválida!");
    }
    if (titleValue === "") {
      errors.push("Título vazio!");
    }
    if (parseInt(valueValue) <= 0 || !parseInt(valueValue)) {
      errors.push("Valor inválido!");
    }
    if (errors.length > 0) {
      alert(errors.join("\n"));
    } else {
      handleAddItem({
        id: uuidv4(),
        date: newDateAdjusted(dateValue),
        category: handleRefValues(categoryValue) as string,
        title: titleValue,
        value: parseFloat(valueValue),
      });

      clearFields();
    }
  };

  const clearFields = () => {
    refs.titleRef.current = null;
    refs.valueRef.current = null;
    refs.categoryRef.current = null;
    refs.dateRef.current = null;
  };

  useEffect(() => {
    const storedList = getLocalStorage();
    if (storedList) {
      setList(storedList);
    }
  }, []);

  return { refs, handleAddEvent, handleDeleteItem, handleEditItem, list };
}
