import React, { useEffect, useState } from "react";
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
import Toast from "@/components/Toast";

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
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = () => {
    const newErrors = [];
    if (!Number(value)) newErrors.push("VALOR INVÁLIDO");
    if (title.length < 4) newErrors.push("DESCRIÇÃO INVÁLIDO");
    if (!date) newErrors.push("DATA INVÁLIDO");
    if (!category) newErrors.push("CATEGORIA INVÁLIDO");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      // setIsOpen(false);
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
  };

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
      setErrors([]);
      updateCategory("");
      updateDate("");
      updateTitle("");
      updateValue("");
    }
  }, [isOpen]);

  return (
    <>
      <Toast activate={isOpen}>
        {errors.map((item, index) => (
          <h1 className="bg-blue-950 p-4 m-1 rounded-md " key={index}>
            {item}
          </h1>
        ))}
      </Toast>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <div>{modalName}</div>
        </DialogTrigger>
        <DialogContent className="bg-gray-200">
          <DialogHeader>
            <DialogTitle>{headerTitle}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col m-4 gap-3">
            <div className="flex flex-col gap-1">
              <Label className="text-sm text-gray-700">VALOR</Label>
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
                  <Label className="text-sm text-gray-700">CATEGORIAS</Label>
                  <Select onValueChange={updateCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha a Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseKeys.map((item, index) => (
                        <SelectItem key={index} value={item}>
                          {categories[item].title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}

              {status === "income" && (
                <>
                  <Label className="text-sm text-gray-700">CATEGORIAS</Label>

                  {/* <Input
                    onChange={(e) => setCategory(e.target.value)}
                    value={incomeKeys[0]}
                    disabled
                  // /> */}

                  <Select onValueChange={updateCategory}>
                    <SelectTrigger>
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
              <Label className="text-sm text-gray-700">DATA</Label>
              <Input
                type="date"
                onChange={(e) => updateDate(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-sm text-gray-700">DESCRIÇÃO</Label>
              <Textarea onChange={(e) => updateTitle(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end">
            {/* <DialogTrigger> */}
            <div onClick={handleSubmit}>
              <GenericButton tailwind="bg-blue-950">REGISTRAR</GenericButton>
            </div>
            {/* </DialogTrigger> */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalTest;
