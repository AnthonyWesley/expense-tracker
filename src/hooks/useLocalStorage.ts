import { ItemType } from "@/type/ItemType";

export default function useLocalStorage() {
  const setLocalStorage = (list: ItemType[]) => {
    const itemsToStore = list.map((item) => ({
      ...item,
      date: item.date.toISOString(),
    }));
    localStorage.setItem(".", JSON.stringify(itemsToStore));
  };

  const getLocalStorage = () => {
    const storedData = JSON.parse(localStorage.getItem(".") || "[]");
    const items = storedData.map((item: ItemType) => ({
      ...item,
      date: new Date(item.date),
    }));

    return items;
  };

  return {
    getLocalStorage,
    setLocalStorage,
  };
}
