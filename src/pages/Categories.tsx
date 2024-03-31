import React, { useState } from "react";
import G_InputArea from "../components/ui/G_InputArea";
import G_Select from "../components/ui/G_Select";
import G_Button from "../components/ui/G_Button";
import { useApiContext } from "../context/ApiContext";
import { CategoryApiType } from "../type/CategoryType";
import EditedInput from "../components/categories/EditedInput";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useToastStore } from "../components/ui/Toast";
import SelectColors from "../components/ui/SelectColors";

const status = ["RECEITAS", "DESPESAS"];
const Categories: React.FC = () => {
  const [newCategory, setNewCategory] = useState<CategoryApiType>({
    title: "",
    color: "",
    expense: false,
  });

  const { categories, apiCreateCategory, apiUpdateCategory, apiUpdateMany } =
    useApiContext();

  const categoriesArray = Object.values(categories);
  const { addAlert } = useToastStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory((event) => ({ ...event, title: e.target.value }));
  };

  const handleCreate = () => {
    if (!newCategory.title || !newCategory.color) {
      addAlert([{ message: "Preencha todas os campos!", type: "error" }]);

      return;
    }
    if (
      categoriesArray
        .filter((cat) => cat.title)
        .map((item) => item.title)
        .includes(newCategory.title.toUpperCase().trim())
    ) {
      addAlert([
        {
          message: `"${newCategory.title}" já existe. Escolha outro nome!`,
        },
      ]);
    } else {
      apiCreateCategory(newCategory);
      addAlert([{ message: "Categoria criada com sucesso!", type: "success" }]);
      setNewCategory({
        title: "",
        color: "",
        expense: false,
      });
    }
  };

  const updateCategory = async (
    item: CategoryApiType,
    currentName?: string
  ) => {
    if (item && item.id && currentName) {
      const response = await apiUpdateCategory(item.id, item);

      navigate("/categories");
      if (response) {
        await apiUpdateMany(currentName, item.title);
        addAlert([
          {
            message: `categoria editada com sucesso!`,
            type: "success",
          },
        ]);
        navigate("/categories");
      }
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
    // console.log(option);

    setNewCategory((event) => ({ ...event, color: option }));
  };

  return (
    <section className="container w-full flex flex-col mx-auto my-16 gap-2 p-2">
      <div className=" text-2xl">SUAS CATEGORIAS</div>

      <div className="w-full flex flex-col lg:flex-row gap-2 mb-4 bg-gray-900">
        <G_InputArea
          type="text"
          placeholder="Nome da Categoria"
          onChange={handleChange}
          value={newCategory.title}
        />

        <div className="flex w-full gap-2">
          <SelectColors
            onSelect={selectColor}
            categories={categoriesArray}
            value={newCategory.color}
          />
          <G_Select
            onSelect={selectStatus}
            optionList={status}
            className="w-full"
            value={newCategory.color}
          />

          <G_Button
            onClick={handleCreate}
            className="bg-blue-900 flex justify-center w-full"
          >
            CRIAR
          </G_Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full justify-between items-start gap-2">
        <div className="bg-appSecondaryColor min-h-52 w-full">
          <h1 className="flex items-center text-2xl gap-2 text-green-600 font-semibold p-3">
            <Icon icon="pepicons-print:triangle-up" /> RECEITAS
          </h1>
          {categoriesArray
            .filter((item) => !item.expense)
            .map((category, index) => (
              <div key={index} className="flex gap-2 w-full my-1">
                <EditedInput category={category} onUpdate={updateCategory} />
              </div>
            ))}
        </div>

        <div className="bg-appSecondaryColor min-h-52 w-full">
          <h1 className="flex items-center text-2xl gap-2 text-red-600 font-semibold p-3">
            <Icon icon="pepicons-print:triangle-down" /> DESPESAS
          </h1>
          {categoriesArray
            .filter((item) => item.expense)
            .map((category, index) => (
              <div key={index} className="flex gap-2 w-full my-1">
                <EditedInput category={category} onUpdate={updateCategory} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
