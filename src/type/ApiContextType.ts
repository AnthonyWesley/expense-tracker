import { AxiosResponse } from "axios";
import { RecordType } from "./RecordType";
import { UserType } from "./UserType";

export type ApiContextType = {
  loading: boolean;
  list: RecordType[];
  dataUser: UserType | undefined;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDataUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
  registerUser: (user: UserType) => Promise<void | AxiosResponse<any, any>>;
  loginUser: (user: UserType) => Promise<UserType>;
  apiCreateRecord: (record: RecordType) => void;
  apiDeleteRecord: (id: string) => void;
  apiReadRecord: () => Promise<RecordType[]>;
  apiUpdateRecord: (
    id: string,
    updatedItem: RecordType
  ) => Promise<AxiosResponse<any, any> | undefined>;
};
