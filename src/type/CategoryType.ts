import { RecordType } from "./RecordType";

export type CategoryApiType = {
  id?: string;
  title: string;
  color: string;
  expense: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CategoriesType = {
  [tag: string]: {
    id?: string;
    title: string;
    color: string;
    expense: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  };
};

export type CategorySummaryType = {
  id?: string;
  category: string;
  totalValue: number;
  color: string;
  allDescriptions: RecordType[];
};
