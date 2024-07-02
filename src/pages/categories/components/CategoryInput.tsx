import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

import SelectColors from "../../../components/SelectColors";
import { useToastStore } from "../../../components/Toast";
import { useApiContext } from "../../../context/ApiContext";
import { CategoryApiType } from "../../../type/CategoryType";
import Dropdown from "../../../components/Dropdown";

const status = ["RECEITAS", "DESPESAS"];

const CategoryInput = () => {
  const [newCategory, setNewCategory] = useState<CategoryApiType>({
    name: "",
    color: "",
    expense: false,
  });

  const { categories, apiCreateCategory } = useApiContext();

  const categoriesArray = Object.values(categories);

  const { showAlert } = useToastStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory((event) => ({
      ...event,
      name: e.target.value.toUpperCase(),
    }));
  };

  const handleCreate = () => {
    if (!newCategory.name || !newCategory.color) {
      showAlert("Preencha todas os campos!", "error");

      return;
    }
    if (
      categoriesArray
        .filter((cat) => cat.name)
        .map((item) => item.name)
        .includes(newCategory.name.toUpperCase().trim())
    ) {
      showAlert(
        `"${newCategory.name}" já existe. Escolha outro nome!`,
        "warning"
      );
    } else {
      apiCreateCategory(newCategory);
      showAlert("Categoria criada com sucesso!", "success");
      setNewCategory({
        name: "",
        color: "",
        expense: newCategory.expense,
      });
    }
  };

  const selectStatus = (option: string) => {
    if (option === "DESPESAS") {
      setNewCategory((event) => ({ ...event, expense: true }));
    } else {
      setNewCategory((event) => ({ ...event, expense: false }));
    }
  };

  const selectColor = (option: string) => {
    setNewCategory((event) => ({ ...event, color: option }));
  };
  return (
    <div className="w-full flex flex-col lg:flex-row gap-2 mb-4 bg-gray-900">
      <Input
        type="text"
        placeholder="Nome da Categoria"
        onChange={handleChange}
        value={newCategory.name}
      />
      <div className="flex w-full gap-2">
        <SelectColors
          onSelect={selectColor}
          categories={categoriesArray}
          value={newCategory.color}
        />

        <Dropdown
          dropdownList={status}
          dropdownSelect={selectStatus}
          className={`w-full ${
            newCategory.expense ? `border-red-600` : "border-green-600"
          }`}
        />
        <Button
          onClick={handleCreate}
          className="bg-blue-900 flex justify-center w-full"
        >
          CRIAR
        </Button>
      </div>
    </div>
  );
};

export default CategoryInput;
