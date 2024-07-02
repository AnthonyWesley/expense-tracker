import { RecordType } from "./RecordType";

export type AccountType = {
  id?: string;
  name: string;
  branch: string;
  number: string;
  type: string;
  records?: RecordType[];
  created_at?: string;
  updated_at?: string;
  userId?: string;
};
