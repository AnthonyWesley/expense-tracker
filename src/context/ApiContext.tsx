import { createContext, useContext, useEffect, useState } from "react";
import { RecordType } from "../type/RecordType";
import { UserType } from "../type/UserType";

import useAxios from "../hooks/useAxios";
import RecordApi from "../api/RecordApi";
import UserApi from "../api/UserApi";
import CategoryApi from "../api/CategoryApi";
import { CategoriesType, CategoryApiType } from "../type/CategoryType";
import { ApiContextType } from "../type/ApiContextType";
import AccountApi from "../api/AccountApi";
import { AccountType } from "../type/AccountType";

export type TokenType = { accessToken: string; refreshToken: string };

export const ApiContext = createContext<ApiContextType | null>(null);

export default function ApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accountCount, setAccountCount] = useState(0);
  const [dataUser, setDataUser] = useState<UserType | undefined>();
  const { setAuthTokens, axiosInstance, loading, setLoading } = useAxios();
  const [list, setList] = useState<RecordType[]>([]);
  const [accountList, setAccountList] = useState<AccountType[]>([]);
  const [categories, setCategories] = useState<CategoriesType>({});
  const userApi = new UserApi();
  const recordApi = new RecordApi(axiosInstance);
  const categoryApi = new CategoryApi(axiosInstance);
  const accountApi = new AccountApi(axiosInstance);

  async function registerUser(user: UserType) {
    setLoading(true);
    const response = await userApi.register(user);
    if (response) {
      setLoading(false);
      return response;
    }
  }

  async function loginUser(user: UserType) {
    const response = await userApi.login(user);
    if (response) {
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      setAuthTokens(response.data.token);
      setDataUser(response.data.user);
      return response?.data?.user;
    }
  }

  async function apiCreateAccount(item: AccountType) {
    const response = await accountApi.create(item);
    if (response) {
      apiReadAccount();
      return response;
    }
  }

  const changeAccount = async () => {
    if (accountList.length > 0) {
      const record = await accountList[accountCount]?.records?.map(
        (item: RecordType) => ({
          ...item,
          date: new Date(item.date),
        })
      );
      if (record) {
        setList(record);
      }
    }
  };
  useEffect(() => {
    changeAccount();
  }, [accountCount, accountList]);

  async function apiReadAccount() {
    const response = await accountApi.read();
    // const record = await response[accountCount].records.map(
    //   (item: RecordType) => ({
    //     ...item,
    //     date: new Date(item.date),
    //   })
    // );

    if (response) {
      setAccountList(response);
      // setList(record);
      return response;
    }
  }

  async function apiUpdateAccount(id: string, updatedItem: AccountType) {
    const response = await accountApi.update(id, updatedItem);
    console.log(response);

    if (response) {
      apiReadAccount();
      return response;
    }
  }

  async function apiDeleteAccount(id: string) {
    const response = await accountApi.delete(id);
    if (response) {
      apiReadAccount();
      return response;
    }
  }
  async function apiCreateRecord(item: RecordType) {
    const response = await recordApi.create(item);
    if (response) {
      apiReadAccount();

      return response;
    }
  }

  async function apiReadRecord() {
    const response = await recordApi.read();
    if (response) {
      setList(response);
      return response;
    }
  }

  async function apiUpdateRecord(id: string, updatedItem: RecordType) {
    const response = await recordApi.update(id, updatedItem);
    if (response) {
      apiReadAccount();

      return response;
    }
  }

  async function apiDeleteRecord(id: string) {
    const response = await recordApi.delete(id);
    if (response) {
      apiReadAccount();

      return response;
    }
  }

  async function apiUpdateMany(currentName: string, updateName: string) {
    const response = await recordApi.updateMany(currentName, updateName);
    if (response) {
      apiReadAccount();

      return response;
    }
  }

  async function apiCreateCategory(item: CategoryApiType) {
    const response = await categoryApi.create(item);

    if (response) {
      apiReadCategory();
      setCategories(response);
      return response;
    }
  }
  async function apiReadCategory() {
    const response = await categoryApi.read();

    if (response) {
      setCategories(response);

      return response;
    }
  }

  async function apiDeleteCategory(id: string) {
    const response = await categoryApi.delete(id);
    if (response) {
      apiReadCategory();
      return response;
    }
  }

  async function apiUpdateCategory(id: string, updatedItem: CategoryApiType) {
    const response = await categoryApi.update(id, updatedItem);
    if (response) {
      apiReadCategory();
      return response;
    }
  }

  useEffect(() => {
    if (dataUser?.name) {
      apiReadAccount();

      apiReadAccount();

      apiReadCategory();
    }
  }, [dataUser?.name]);

  useEffect(() => {
    const storedTokens = localStorage.getItem("authTokens");

    if (storedTokens) {
      setDataUser(JSON.parse(storedTokens).user);
      setAuthTokens(JSON.parse(storedTokens).token);
    }
  }, []);

  return (
    <ApiContext.Provider
      value={{
        loading,
        setLoading,
        setDataUser,
        list,
        dataUser,

        loginUser,
        registerUser,

        accountList,
        apiCreateAccount,
        apiReadAccount,
        apiUpdateAccount,
        apiDeleteAccount,

        apiCreateRecord,
        apiReadRecord,
        apiUpdateRecord,
        apiDeleteRecord,

        categories,

        apiCreateCategory,
        apiDeleteCategory,
        apiUpdateCategory,

        apiUpdateMany,
        accountCount,
        setAccountCount,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}

export function useApiContext() {
  const context = useContext(ApiContext);

  if (!context)
    throw new Error("useAppManager must be used with a contextProvider");

  return context;
}
