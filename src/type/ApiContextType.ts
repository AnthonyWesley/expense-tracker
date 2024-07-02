import { AxiosResponse } from "axios";
import { RecordType } from "./RecordType";
import { UserType } from "./UserType";
import { CategoriesType, CategoryApiType } from "./CategoryType";
import { AccountType } from "./AccountType";

export type ApiContextType = {
  loading: boolean;
  list: RecordType[];
  accountList: AccountType[];
  dataUser: UserType | undefined;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDataUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
  registerUser: (user: UserType) => Promise<void | AxiosResponse<any, any>>;
  loginUser: (user: UserType) => Promise<UserType>;

  apiCreateAccount: (account: AccountType) => void;
  apiDeleteAccount(id: string): Promise<true | undefined>;
  apiReadAccount: () => Promise<AccountType[]>;
  apiUpdateAccount: (
    id: string,
    updatedItem: AccountType
  ) => Promise<AxiosResponse<any, any> | undefined>;

  apiCreateRecord: (record: RecordType) => void;
  apiDeleteRecord: (id: string) => void;
  apiReadRecord: () => Promise<RecordType[]>;
  apiUpdateRecord: (
    id: string,
    updatedItem: RecordType
  ) => Promise<AxiosResponse<any, any> | undefined>;

  categories: CategoriesType;
  apiCreateCategory: (item: CategoryApiType) => void;
  apiDeleteCategory: (id: string) => void;
  apiUpdateCategory: (id: string, updatedItem: CategoryApiType) => Promise<any>;

  apiUpdateMany(currentName: string, updateName: string): Promise<any>;
  accountCount: number;
  setAccountCount: React.Dispatch<React.SetStateAction<number>>;
};
