import { createContext, useContext, useEffect, useState } from "react";
import { RecordType } from "../type/RecordType";
import { UserType } from "../type/UserType";
import { ApiContextType } from "../type/ApiContextType";
import axios from "axios";
import useAxios from "../hooks/useAxios";

export type TokenType = { accessToken: string; refreshToken: string };

export const ApiContext = createContext<ApiContextType | null>(null);

export default function ApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dataUser, setDataUser] = useState<UserType | undefined>();
  const { setAuthTokens, axiosInstance, loading, setLoading } = useAxios();
  const [list, setList] = useState<RecordType[]>([]);

  async function registerUser(user: UserType) {
    try {
      const response = await axios.post(
        "https://expense-tracker-api-e91c.onrender.com/register",
        user,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response;
    } catch (error: any) {
      return console.error("Erro ao registrar uruário:", error.message);
    }
  }

  async function loginUser(user: UserType) {
    try {
      const response = await axios.post(
        "https://expense-tracker-api-e91c.onrender.com/login",
        user,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response) {
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        setAuthTokens(response.data.token);
        setDataUser(response.data.user);
      }

      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if ([401, 403].includes(error.response.status)) {
            window.alert("Email/Senha Inválido!");
            window.location.href = "/login";
          }
          return Promise.reject(error);
        }
      );

      return response.data.user;
    } catch (error: any) {
      return console.error("Erro ao logar com uruário:", error.message);
    }
  }

  async function apiCreateRecord(item: RecordType) {
    try {
      const response = await axiosInstance
        .post("/records", item)
        .then((res) => {
          if (res) {
            apiReadRecord();
          }
        });

      return response;
    } catch (error: any) {
      console.error("Erro ao adicionar item:", error.message);
    }
  }

  async function apiReadRecord() {
    try {
      const response = await axiosInstance.get("/records");

      const items = await response?.data?.records.map((item: RecordType) => ({
        ...item,
        date: new Date(item.date),
      }));
      setList(items);
      return items;
    } catch (error: any) {
      console.error("Erro ao obter dados da API:", error.message);
      setList([]);
    }
  }

  async function apiUpdateRecord(id: string, updatedItem: RecordType) {
    try {
      const response = await axiosInstance.put(
        `https://expense-tracker-api-e91c.onrender.com/record/${id}`,
        updatedItem
      );
      if (response) {
        apiReadRecord();
      }
      return response;
    } catch (error: any) {
      console.error("Erro ao editar item:", error.message);
    }
  }

  async function apiDeleteRecord(id: string) {
    try {
      const response = await axiosInstance.delete(
        `https://expense-tracker-api-e91c.onrender.com/record/${id}`
      );

      if (response) {
        await apiReadRecord();
      }

      return response;
    } catch (error: any) {
      console.error("Erro ao excluir item no servidor:", error.message);
    }
  }

  useEffect(() => {
    if (dataUser?.name) {
      apiReadRecord();
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
