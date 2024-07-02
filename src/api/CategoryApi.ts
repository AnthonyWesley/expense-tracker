import { AxiosInstance } from "axios";
import { CategoriesType, CategoryApiType } from "../type/CategoryType";

class CategoryApi {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async create(item: CategoryApiType) {
    try {
      const response = await this.axiosInstance.post("/category", item);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao adicionar item:", error.message);
      throw error;
    }
  }

  async read() {
    try {
      const response = await this.axiosInstance.get("/category");

      const categoriesObj: CategoriesType = await response.data.data.reduce(
        (acc: CategoriesType, item: CategoryApiType) => {
          acc[item.name] = {
            ...item,
            // title: item.title.toUpperCase(),
          };
          return acc;
        },
        {}
      );

      return categoriesObj;
    } catch (error: any) {
      console.error("Erro ao obter dados da API:", error.message);
      throw error;
    }
  }

  async update(id: string, updatedItem: CategoryApiType) {
    try {
      const response = await this.axiosInstance.put(
        `/category/${id}`,
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
      await this.axiosInstance.delete(`/category/${id}`);
      return true;
    } catch (error: any) {
      console.error("Erro ao excluir item no servidor:", error.message);
      throw error;
    }
  }
}

export default CategoryApi;
