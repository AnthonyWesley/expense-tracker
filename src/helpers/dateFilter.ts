import { ItemType } from "@/type/ItemType";

export const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
};
export const filterListByMonth = (
  list: ItemType[],
  date: string
): ItemType[] => {
  let newList: ItemType[] = [];
  let [year, month] = date.split("-");

  for (let i in list) {
    if (
      list[i]?.date.getFullYear() === parseInt(year) &&
      list[i]?.date.getMonth() + 1 === parseInt(month)
    ) {
      newList.push(list[i]);
    }
  }

  newList.sort((a, b) => {
    return a.date.getTime() - b.date.getTime();
  });

  return newList;
};

export const formatDate = (date: Date): string => {
  let year = date?.getFullYear();
  let month = date?.getMonth() + 1;
  let day = date?.getDate();

  return `${addZeroToDate(day)}/${addZeroToDate(month)}/${year}`;
};
const addZeroToDate = (number: number): string =>
  number < 10 ? `0${number}` : `${number}`;

export const formatCurrentMonth = (currentMonth: string): string => {
  let [year, month] = currentMonth.split("-");
  let months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return `${months[parseInt(month) - 1]} de ${year}`;
};

export const newDateAdjusted = (dateField: string) => {
  const [year, month, day] = dateField.split("-");
  const adjustedDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day)
  );

  if (isNaN(adjustedDate.getTime())) {
    throw new Error("Data inválida: " + dateField);
  }

  return adjustedDate;
};

export const FormattedCurrency = (currency: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(currency);
};

export const findItemByParams = (list: ItemType[], paramsId: string) => {
  return list.find((item) => item.id == paramsId);
};

export const handleRefValues = (
  ref: string | { value: string }
): string | undefined => {
  if (typeof ref === "string") {
    return ref;
  } else if (typeof ref?.value === "string") {
    return ref.value;
  }
};
