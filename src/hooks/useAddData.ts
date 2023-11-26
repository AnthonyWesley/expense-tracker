import { categories } from "@/data/categories";
import { ItemType } from "@/type/ItemType";
import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { useRouter } from "next/navigation";
import { DateHelpers } from "@/helpers/DateHelpers";
import { useRecordStore } from "@/store/useRecordStore";

export default function useAddData() {
  const dateHelpers = new DateHelpers();
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const {
    title,
    value,
    category,
    date,
    updateCategory,
    updateDate,
    updateId,
    updateTitle,
    updateValue,
  } = useRecordStore();

  const [list, setList] = useState<ItemType[]>([]);
  const router = useRouter();
  const { v4: uuidv4 } = require("uuid");
  let categoryKeys: string[] = Object.keys(categories);

  // const [title, setTitle] = useState("");
  // const [value, setValue] = useState("");
  // const [category, setCategory] = useState("");
  // const [date, setDate] = useState("");

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
    handleAddItem({
      id: uuidv4(),
      date: dateHelpers.newDateAdjusted(date),
      category: category,
      title: title,
      value: parseFloat(value),
    });
  };

  useEffect(() => {
    // updateLocalStorage();
    const storedList = getLocalStorage();
    if (storedList) {
      setList(storedList);
    }
  }, []);

  // function updateLocalStorage() {
  //   const storedData = JSON.parse(localStorage.getItem(".") || "[]");
  //   const updatedItems = storedData.map((item: any) => {
  //     if (item.category === "personalCare") {
  //       item.category = "care";
  //     }
  //     return item;
  //   });
  //   localStorage.setItem(".", JSON.stringify(updatedItems));
  //   return updatedItems;
  // }

  return {
    category,
    date,
    title,
    value,

    handleAddEvent,
    handleDeleteItem,
    handleEditItem,
    list,

    // setValue,
    // setTitle,
    // setCategory,
    // setDate,
  };
}
