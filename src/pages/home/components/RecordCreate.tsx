import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Input from "../../../components/Input";
import { useToastStore } from "../../../components/Toast";
import { useApiContext } from "../../../context/ApiContext";
import { dateHelpers } from "../../../helpers/DateHelpers";
import {
  categorizeCategories,
  validateFields,
  autoCurrency,
  toNumber,
} from "../../../helpers/others";
import { useRecordStore } from "../../../store/useRecordStore";
import { useModalStore } from "../../../components/Modal";
import Dropdown from "../../../components/Dropdown";

export default function RecordCreate() {
  const {
    updateCategory,
    updateDescription,
    updateValue,
    updateDate,
    date,
    category,
    description,
    value,
  } = useRecordStore();
  const { closeModal, isOpen } = useModalStore();
  const [change, setChange] = useState(true);
  const { showAlert } = useToastStore();
  const { apiCreateRecord, categories, accountList, accountCount } =
    useApiContext();
  const { incomeKeys, expenseKeys } = categorizeCategories(categories);

  const createRecord = async () => {
    const newErrors = validateFields({ date, category, value, description });
    if (newErrors.length > 0) {
      newErrors.forEach((error) => showAlert(error.message!, error.type));

      return;
    }

    await apiCreateRecord({
      date: dateHelpers.newDateAdjusted(date),
      category: category,
      description: description,
      value: toNumber(value) as number,
      accountId: accountList[accountCount]?.id || "",
    });

    showAlert("Registro criado com sucesso!", "success");
    closeModal();
  };

  const selectList = (option: string) => {
    if (option) updateCategory(option);
  };

  useEffect(() => {
    if (!isOpen) {
      updateCategory("");
      updateDate(dateHelpers.initialDate());
      updateDescription("");
      updateValue("");
    }
  }, [isOpen, change]);

  return (
    <div className="rounded-lg bg-gray-800 w-full max-w-lg">
      <Header
        change={change}
        setChange={setChange}
        subtitleOne={"RECEITAS"}
        subtitleTwo={"DESPESAS"}
      />

      <main className="flex flex-col gap-2 py-2 px-4">
        <div className="w-full flex justify-end items-center">
          <Icon
            icon="ic:sharp-account-balance"
            width="1.2rem"
            height="1.2rem"
          />

          <h1 className="text-xl">{accountList[accountCount]?.name}</h1>
        </div>
        <Input
          name="DATA"
          type="date"
          value={date || dateHelpers.initialDate()}
          onChange={(e) => updateDate(e.target.value)}
        />

        {change && isOpen && (
          <Dropdown
            dropdownList={incomeKeys.map((item) => categories[item]?.name)}
            dropdownSelect={selectList}
            subtitle="CATEGORIA"
            className="bg-slate-700 rounded-md"
          />
        )}
        {!change && isOpen && (
          <Dropdown
            dropdownList={expenseKeys.map((item) => categories[item]?.name)}
            dropdownSelect={selectList}
            subtitle="CATEGORIA"
            className="bg-slate-700 rounded-md"
          />
        )}

        <Input
          name="VALOR"
          type="text"
          value={value}
          onChange={(e) =>
            updateValue(autoCurrency(e.target.value.replace(/\D/g, "")))
          }
        />
        <Input
          name="DESCRICÃO"
          rows={3}
          value={description}
          onChange={(e) => updateDescription(e.target.value)}
        />
      </main>

      <footer className="flex gap-1 justify-end py-2 px-4">
        <Button
          onClick={createRecord}
          className="bg-blue-900 text-white py-3 px-4 rounded-sm hover:bg-blue-800"
        >
          REGISTRAR
        </Button>
      </footer>
    </div>
  );
}
