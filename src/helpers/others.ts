import { ItemType } from "@/type/ItemType";

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

export const formattedText = (text: string) =>
  text.length > 50 ? `${text.slice(0, 50)} ...` : text;
