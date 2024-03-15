import { AxiosInstance } from "axios";
import { RecordType } from "../type/RecordType";

class RecordApi {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async create(item: RecordType) {
    try {
      const response = await this.axiosInstance.post("/records", item);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao adicionar item:", error.messageS);
      throw error;
    }
  }

  async read() {
    try {
      const response = await this.axiosInstance.get("/records");
      return response.data.records.map((item: RecordType) => ({
        ...item,
        date: new Date(item.date),
      }));
    } catch (error: any) {
      console.error("Erro ao obter dados da API:", error.message);
      throw error;
    }
  }

  async update(id: string, updatedItem: RecordType) {
    try {
      const response = await this.axiosInstance.put(
        `/record/${id}`,
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
      await this.axiosInstance.delete(`/record/${id}`);
      return true;
    } catch (error: any) {
      console.error("Erro ao excluir item no servidor:", error.message);
      throw error;
    }
  }
}

export default RecordApi;
