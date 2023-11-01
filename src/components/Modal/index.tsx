import React, { useState } from "react";
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
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useAppContext } from "@/context";
import { categories } from "@/data/categories";
import { CategoriesType } from "@/type/CategoriesType";
import { Textarea } from "../ui/textarea";
import GenericButton from "../GenericButton";

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
  const { refs } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    setIsOpen(false);

    if (funcActions && funcActions.funcOne) {
      funcActions.funcOne();
    }

    if (funcActions && funcActions.funcTwo) {
      funcActions.funcTwo();
    }

    if (funcActions && funcActions.funcTree) {
      funcActions.funcTree();
    }
  };

  const handleSelectValueChange = (selectedValue: any | string) => {
    refs.categoryRef.current = selectedValue;
  };
  const categorizeCategories = (cat: CategoriesType) => {
    const income: CategoriesType = {};
    const expense: CategoriesType = {};

    for (const key in cat) {
      if (cat[key].expense) {
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

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div onClick={handleOpen}>{modalName}</div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{headerTitle}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col m-4 gap-3">
            <div className="flex flex-col gap-1">
              <Label className="text-sm text-gray-700">VALOR</Label>
              <Input
                ref={refs.valueRef}
                placeholder="Ex: 10,00"
                type="number"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              {status == "expense" && (
                <>
                  <Label className="text-sm text-gray-700">CATEGORIAS</Label>
                  <Select onValueChange={handleSelectValueChange}>
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

                  <Input
                    ref={refs.categoryRef}
                    value={incomeKeys[0]}
                    disabled
                  />
                </>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-sm text-gray-700">DATA</Label>
              <Input ref={refs.dateRef} type="date" required />
            </div>

            <div className="flex flex-col gap-1">
              <Label className="text-sm text-gray-700">DESCRIÇÃO</Label>
              <Textarea
                ref={refs.titleRef as React.RefObject<HTMLTextAreaElement>}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <DialogTrigger>
              <div onClick={handleSubmit}>
                <GenericButton tailwind="bg-blue-950">REGISTRAR</GenericButton>
              </div>
            </DialogTrigger>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalTest;
