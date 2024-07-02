import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { useConfirmStore } from "../../components/Confirm";
import { useToastStore } from "../../components/Toast";
import { useApiContext } from "../../context/ApiContext";
import { dateHelpers } from "../../helpers/DateHelpers";
import {
  categorizeCategories,
  findItemByParams,
  validateFields,
  toNumber,
  toCurrency,
  autoCurrency,
} from "../../helpers/others";

import Dropdown from "../../components/Dropdown";

export default function index() {
  const [record, setRecord] = useState<any>({
    category: "",
    date: new Date(),
    description: "",
    value: 0,
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const { showAlert } = useToastStore();
  const { handleConfirm } = useConfirmStore();
  const { list, apiDeleteRecord, apiUpdateRecord, categories } =
    useApiContext();
  const { expenseKeys, incomeKeys } = categorizeCategories(categories);

  const onConfirm = async () => {
    handleConfirm({
      message: "Deseja deletar o registro?",
      callback: handleDelete,
    });
  };

  useEffect(() => {
    const newList = findItemByParams(list, id);
    if (newList) setRecord(newList);
  }, [list]);

  const handleDelete = async () => {
    await apiDeleteRecord(id);
    navigate("/");
  };

  const toggleDisabled = () => {
    const newErrors = validateFields(record);
    if (!isDisabled) {
      if (newErrors.length > 0) {
        newErrors.forEach((error) => showAlert(error.message!, error.type));
        return;
      }

      apiUpdateRecord(id, {
        category: record?.category,
        date: record?.date,
        description: record?.description,
        value: toNumber(record?.value) as number,
      });
    }
    setIsDisabled(!isDisabled);
  };

  const selectList = (option: string) => {
    if (option)
      setRecord((prevRecord: string[]) => ({
        ...prevRecord,
        category: option,
      }));
  };

  useEffect(() => {
    if (!isDisabled) inputRef?.current?.focus();
  }, [isDisabled]);

  if (record === undefined) {
    return null;
  }

  return (
    <div className="container mx-auto rounded-lg lg:my-14 my-16 p-4 bg-white">
      <div className="space-y-1">
        {isDisabled && (
          <div
            className=" pl-4 text-md font-bold leading-none rounded-sm py-2 "
            style={{ backgroundColor: categories[record.category]?.color }}
          >
            {record?.category}
          </div>
        )}

        {!isDisabled && (
          <Dropdown
            dropdownSelect={selectList}
            dropdownList={(categories[record?.category]?.expense
              ? expenseKeys
              : incomeKeys
            ).map((item) => categories[item]?.name)}
            className={`text-md font-bold leading-none rounded-sm py-2 `}
            style={{ backgroundColor: categories[record.category]?.color }}
          />
        )}

        <textarea
          rows={3}
          name="description"
          className={`bg-transparent p-4 w-full  text-appPrimaryColor border  ${
            !isDisabled ? " border-2 border-gray-800" : ""
          }`}
          value={record?.description || ""}
          disabled={isDisabled}
          onChange={(e) =>
            setRecord({
              ...record,
              description: e.target.value,
            })
          }
        />
      </div>

      <hr className="my-4" />

      <div className="flex h-5 items-center space-x-4 text-sm text-appPrimaryColor">
        <div className="w-20">
          {(categories[record?.category]?.expense && (
            <Icon icon="pepicons-print:triangle-down" color="red" width={30} />
          )) || (
            <Icon
              icon="pepicons-print:triangle-up"
              color="#22d3ee"
              width={30}
            />
          )}
        </div>
        <hr />
        <div className="flex items-center gap-1 w-full">
          {/* <p>R$</p> */}
          <input
            type="text"
            name="value"
            className="text-sm text-appPrimaryColor py-4 w-24 bg-white"
            ref={inputRef}
            value={isDisabled ? toCurrency(record.value) : record.value || ""}
            disabled={isDisabled}
            onChange={(e) =>
              setRecord({
                ...record,
                value: autoCurrency(e.target.value.replace(/\D/g, "")),
              })
            }
          />
        </div>
        <hr />
        <input
          type="date"
          name="date"
          className={`bg-transparent p-4 w-full  text-appPrimaryColor border lg:w-52  ${
            !isDisabled ? " border-2 border-gray-800" : ""
          }`}
          value={dateHelpers.formatDate(record.date, true) || ""}
          disabled={isDisabled}
          onChange={(e) =>
            setRecord({
              ...record,
              date: dateHelpers.newDateAdjusted(e.target.value),
            })
          }
        />
      </div>

      <hr className="my-4 text-right" />

      <div className="flex h-5 justify-end space-x-2 text-sm my-2 ">
        <Button
          onClick={() => navigate(-1)}
          className="flex justify-center bg-blue-600 p-4 w-20 rounded-sm "
        >
          <Icon icon="line-md:arrow-left" width={30} height={30} />
        </Button>

        <hr />
        <div
          onClick={toggleDisabled}
          className={`${
            isDisabled ? "bg-orange-500" : "bg-green-500"
          } flex justify-center w-20 items-center rounded-sm cursor-pointer p-4`}
          title={isDisabled ? "Editar" : "Confirmar"}
        >
          {isDisabled && <Icon icon="line-md:edit" width={30} height={30} />}
          {!isDisabled && (
            <Icon icon="line-md:confirm" width={30} height={30} />
          )}
        </div>
        <hr />
        <Button
          onClick={onConfirm}
          className="flex justify-center bg-red-600 p-4 w-20 rounded-sm "
        >
          <Icon icon="ph:trash" width={30} height={30} />
        </Button>
      </div>
    </div>
  );
}
