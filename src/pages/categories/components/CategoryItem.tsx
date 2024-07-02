import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import Button from "../../../components/Button";
import { CategoryApiType } from "../../../type/CategoryType";
import useCategoryActions from "../hooks/useCategoryActions";

export default function CategoryItem({
  category,
}: {
  category: CategoryApiType;
  // onUpdate: (item: CategoryApiType, currentName?: string) => void;
}) {
  const [text, setText] = useState(category.name);
  const { inputRef, isDisabled, setIsDisabled, toggleDisabled, setCategoryId } =
    useCategoryActions();

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="flex gap-2 w-full my-1">
      <input
        type="text"
        className={`bg-transparent p-4 w-full text-white border-2 border-opacity-0  ${
          isDisabled ? " border-2 border-orange-50" : ""
        }`}
        disabled={isDisabled}
        onChange={handleTextChange}
        value={text}
        style={{ backgroundColor: category.color }}
        ref={inputRef}
        maxLength={15}
      />
      <div
        onClick={() =>
          toggleDisabled(
            {
              id: category.id,
              expense: category.expense,
              color: category.color,
              name: text,
            },
            category.name
          )
        }
        className={`${
          isDisabled ? "bg-orange-500" : "bg-green-500"
        } flex justify-center w-20 items-center rounded-sm cursor-pointer`}
        title={isDisabled ? "Editar" : "Confirmar"}
      >
        {isDisabled ? (
          <Icon icon="line-md:edit" width={30} height={30} />
        ) : (
          <Icon icon="line-md:confirm" width={30} height={30} />
        )}
      </div>

      {!isDisabled ? (
        <div
          className="flex justify-center w-20 bg-red-500 items-center rounded-sm cursor-pointer"
          onClick={() => setIsDisabled(true)}
          title="Cancelar"
        >
          <Icon icon="line-md:close-small" width={30} />
        </div>
      ) : (
        <Button
          onClick={() => setCategoryId(category.id ? category.id : "")}
          className="bg-blue-900 flex justify-center w-20"
          title="Deletar"
        >
          <Icon icon="ph:trash" width={30} height={30} />
        </Button>
      )}
    </div>
  );
}
