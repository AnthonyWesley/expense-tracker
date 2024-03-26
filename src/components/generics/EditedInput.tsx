import { useState } from "react";
import { CategoryApiType } from "../../type/CategoryType";
import G_Button from "./G_Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useToastStore } from "./Toast";

export default function EditedInput({
  category,
  onDelete,
  onUpdate,
}: {
  category: CategoryApiType;
  onDelete: (id: string) => void;
  onUpdate: (item: CategoryApiType, currentName?: string) => void;
}) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [text, setText] = useState(category.title);
  const { addAlert } = useToastStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const toggleDisabled = (item: CategoryApiType, currentName?: string) => {
    addAlert([
      {
        message: `Editando: "${item.title}"...`,
        type: "warning",
      },
      {
        message: `\u2713 para confirmar`,
        type: "warning",
      },
    ]);
    if (!isDisabled) {
      if (currentName?.trim() === item.title.trim()) {
        addAlert([
          {
            message: `O nome deve ser diferente"...`,
          },
        ]);
        setIsDisabled(isDisabled);
        return;
      }
      onUpdate(item, currentName);
    }
    setIsDisabled(!isDisabled);
  };

  return (
    <div key={category.id} className="flex gap-2 w-full my-1">
      <input
        type="text"
        className={`bg-transparent p-4 w-full text-white border-2 border-opacity-0  ${
          isDisabled ? " border-2 border-orange-50" : ""
        }`}
        disabled={isDisabled}
        value={text}
        onChange={handleChange}
        style={{ backgroundColor: category.color }}
      />
      <div
        onClick={() =>
          toggleDisabled(
            {
              id: category.id,
              expense: category.expense,
              title: text,
              color: category.color,
            },
            category.title
          )
        }
        className={`${
          isDisabled ? "bg-orange-500" : "bg-red-500"
        } flex justify-center w-20 items-center rounded-sm cursor-pointer`}
      >
        {isDisabled && <Icon icon="line-md:edit" width={30} height={30} />}
        {!isDisabled && <Icon icon="line-md:confirm" width={30} height={30} />}
      </div>

      <G_Button
        onClick={() => onDelete(category.id ? category.id : "")}
        className="bg-blue-900 flex justify-center w-20"
      >
        <Icon icon="ph:trash" width={30} height={30} />
      </G_Button>
    </div>
  );
}
