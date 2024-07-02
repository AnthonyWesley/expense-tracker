import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useConfirmStore } from "../../../components/Confirm";
import { useToastStore } from "../../../components/Toast";
import { useApiContext } from "../../../context/ApiContext";
import { CategoryApiType } from "../../../type/CategoryType";

export default function useCategoryActions() {
  const [newCategory, setNewCategory] = useState<CategoryApiType>({
    name: "",
    color: "",
    expense: false,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [categoryId, setCategoryId] = useState("");

  const { showAlert } = useToastStore();
  const { handleConfirm } = useConfirmStore();

  const {
    apiDeleteCategory,
    apiUpdateMany,
    apiUpdateCategory,
    apiCreateCategory,
    categories,
  } = useApiContext();
  const navigate = useNavigate();
  const categoriesArray = Object.values(categories);

  const toggleDisabled = (item: CategoryApiType, currentName?: string) => {
    if (isDisabled) showAlert(`\u2713 para confirmar`, "warning");
    if (!isDisabled) {
      if (currentName?.trim() === item.name.trim()) {
        showAlert(`O nome deve ser diferente"`, "error");
        setIsDisabled(isDisabled);
        return;
      }
      updateCategory(item, currentName);
    }
    setIsDisabled(!isDisabled);
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

  const deleteCategory = async () => {
    if (categoryId) {
      await apiDeleteCategory(categoryId);
      navigate("/categories");
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
        await apiUpdateMany(currentName, item.name);
        showAlert(`Categoria editada com sucesso!`, "success");
        navigate("/categories");
      }
    }
  };

  useEffect(() => {
    if (categoryId) {
      handleConfirm({
        message: "Deseja deletar a categoria?",
        callback: async () => await deleteCategory(),
      });
      setCategoryId("");
    }
  }, [categoryId]);

  useEffect(() => {
    if (!isDisabled) inputRef?.current?.focus();
  }, [isDisabled]);
  return {
    inputRef,
    isDisabled,
    toggleDisabled,
    setIsDisabled,
    setCategoryId,
    handleCreate,
    newCategory,
    setNewCategory,
  };
}
