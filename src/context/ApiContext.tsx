import { createContext, useContext, useEffect, useState } from "react";
import { RecordType } from "../type/RecordType";
import { UserType } from "../type/UserType";
import { ApiContextType } from "../type/ApiContextType";
import useAxios from "../hooks/useAxios";
import RecordApi from "../api/RecordApi";
import UserApi from "../api/UserApi";

export type TokenType = { accessToken: string; refreshToken: string };

export const ApiContext = createContext<ApiContextType | null>(null);

export default function ApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dataUser, setDataUser] = useState<UserType | undefined>();
  const { setAuthTokens, axiosInstance, loading, setLoading } = useAxios();
  const recordApi = new RecordApi(axiosInstance);
  const userApi = new UserApi();
  const [list, setList] = useState<RecordType[]>([]);

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

  async function apiCreateRecord(item: RecordType) {
    const response = await recordApi.create(item);
    if (response) {
      apiReadRecord();
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
      apiReadRecord();
      return response;
    }
  }

  async function apiDeleteRecord(id: string) {
    const response = await recordApi.delete(id);
    if (response) {
      apiReadRecord();
      return response;
    }
  }

  useEffect(() => {
    if (dataUser?.name) apiReadRecord();
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
        apiCreateRecord,
        apiReadRecord,
        apiUpdateRecord,
        apiDeleteRecord,
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
