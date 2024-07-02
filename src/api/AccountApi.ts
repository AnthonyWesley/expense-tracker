import { AxiosInstance } from "axios";
import { AccountType } from "../type/AccountType";

class AccountApi {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async create(item: AccountType) {
    try {
      const response = await this.axiosInstance.post("/account", item);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao adicionar item:", error.messageS);
      throw error;
    }
  }

  async read() {
    try {
      const response = await this.axiosInstance.get("/account");

      return response.data.data;
    } catch (error: any) {
      console.error("Erro ao obter dados da API:", error.message);
      throw error;
    }
  }

  async update(id: string, updatedItem: AccountType) {
    try {
      const response = await this.axiosInstance.put(
        `/account/${id}`,
        updatedItem
      );
      return response.data;
    } catch (error: any) {
      console.error("Erro ao editar item:", error.message);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.axiosInstance.delete(`/account/${id}`);
      return true;
    } catch (error: any) {
      console.error("Erro ao excluir item no servidor:", error.message);
      throw error;
    }
  }

  async updateMany(currentName: string, updateName: string) {
    try {
      const response = await this.axiosInstance.put("/records/update", {
        currentName,
        updateName,
      });
      return response.data;
    } catch (error: any) {
      console.error("Erro ao editar item:", error.message);
      throw error;
    }
  }
}

export default AccountApi;
