import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "../ui/label";

import { categories } from "@/data/categories";
import { CategoriesType } from "@/type/CategoriesType";
import { Textarea } from "../ui/textarea";
import GenericButton from "../GenericButton";
import { useRecordStore } from "@/store/useRecordStore";
import { Toast } from "../Toast";
import { toast } from "react-toastify";

type ModalProp = {
  modalName?: string | JSX.Element;
  headerTitle?: string;
  status: "income" | "expense";
  funcActions?: {
    funcOne?: () => void;
    funcTwo?: () => void;
    funcTree?: () => void;
  };
};

const ModalTest = ({
  modalName,
  headerTitle,
  funcActions,
  status,
}: ModalProp) => {
  const {
    updateCategory,
    updateTitle,
    updateValue,
    updateDate,
    date,
    category,
    title,
    value,
  } = useRecordStore();
  const [isOpen, setIsOpen] = useState(false);
  const notify = useCallback(
    (message: string) =>
      toast.error(`${message}`, {
        progress: undefined,
      }),

    [] // Adicione as dependências necessárias aqui, se houver
  );
  const handleSubmit = useCallback(() => {
    const newErrors = [];
    if (!Number(value)) newErrors.push("VALOR INVÁLIDO");
    if (title.length < 4) newErrors.push("DESCRIÇÃO INVÁLIDO");
    if (!date) newErrors.push("DATA INVÁLIDO");
    if (!category) newErrors.push("CATEGORIA INVÁLIDO");

    if (newErrors.length > 0) {
      newErrors.forEach((item) => notify(item));
      return;
    }

    if (funcActions && funcActions.funcOne) {
      funcActions.funcOne();
    }

    if (funcActions && funcActions.funcTwo) {
      funcActions.funcTwo();
    }

    if (funcActions && funcActions.funcTree) {
      funcActions.funcTree();
    }

    setIsOpen(false);
  }, [value, title, date, category, funcActions, notify]);

  const categorizeCategories = (cat: CategoriesType) => {
    const income: CategoriesType = {};
    const expense: CategoriesType = {};

    for (const key in cat) {
      if (cat[key]?.expense) {
        expense[key] = cat[key];
      } else {
        income[key] = cat[key];
      }
    }

    return { income, expense };
  };

  const categorizedCategories = categorizeCategories(categories);
  const incomeKeys: string[] = Object.keys(categorizedCategories.income);
  const expenseKeys: string[] = Object.keys(categorizedCategories.expense);

  useEffect(() => {
    if (!isOpen) {
      updateCategory("");
      updateDate("");
      updateTitle("");
      updateValue("");
    }
  }, [isOpen]);

  return (
    <section>
      <Toast />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <div>{modalName}</div>
        </DialogTrigger>
        <DialogContent className="bg-gray-200">
          <DialogHeader className="text-appSecondaryColor">
            <DialogTitle>{headerTitle}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col m-4 gap-3">
            <div className="flex flex-col gap-1">
              <Label className="text-sm text-appSecondaryColor">VALOR</Label>
              <Input
                onChange={(e) => updateValue(e.target.value)}
                placeholder="Ex: 10,00"
                type="number"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              {status == "expense" && (
                <>
                  <Label className="text-sm text-appSecondaryColor">
                    CATEGORIAS
                  </Label>
                  <Select onValueChange={updateCategory}>
                    <SelectTrigger className="text-appSecondaryColor">
                      <SelectValue placeholder="Escolha a Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseKeys.map((item, index) => (
                        <SelectItem
                          key={index}
                          value={item}
                          className="text-appSecondaryColor"
                        >
                          {categories[item].title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}

              {status === "income" && (
                <>
                  <Label className="text-sm text-appSecondaryColor">
                    CATEGORIAS
                  </Label>

                  <Select onValueChange={updateCategory}>
                    <SelectTrigger className="text-appSecondaryColor">
                      <SelectValue placeholder="Escolha a Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={incomeKeys[0]}>
                        {incomeKeys[0]}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-sm text-appSecondaryColor">DATA</Label>
              <Input
                type="date"
                onChange={(e) => updateDate(e.target.value)}
                className="text-appSecondaryColor"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-sm text-appSecondaryColor">
                DESCRIÇÃO
              </Label>
              <Textarea
                onChange={(e) => updateTitle(e.target.value)}
                className="text-appSecondaryColor"
              />
            </div>
          </div>
          <div className="flex justify-end">
            {/* <DialogTrigger> */}
            <div onClick={handleSubmit}>
              <GenericButton tailwind="bg-appSecondaryColor">
                REGISTRAR
              </GenericButton>
            </div>
            {/* </DialogTrigger> */}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ModalTest;
