import { useState, useCallback, useEffect, useRef } from "react";
import { useRecordStore } from "../../store/useRecordStore";
import { dateHelpers } from "../../helpers/DateHelpers";
import { categorizeCategories, validateFields } from "../../helpers/others";
import { useApiContext } from "../../context/ApiContext";
import { useToastStore } from "./Toast";
import G_Header from "./G_Header";
import G_InputArea from "./G_InputArea";
import G_Button from "./G_Button";
import G_Select from "./G_Select";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  modalName?: string | JSX.Element;
  className?: string;
  funcActions?: {
    funcOne?: () => void;
    funcTwo?: () => void;
    funcThree?: () => void;
  };
}

const G_Modal = ({ modalName, className, funcActions }: ModalProps) => {
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

  const overlay = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [change, setChange] = useState(true);
  const { categories } = useApiContext();
  const { incomeKeys, expenseKeys } = categorizeCategories(categories);
  const { addAlert } = useToastStore();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const clickCloseRef: React.MouseEventHandler<HTMLElement> = (event) => {
    if (event.target === overlay.current) closeModal();
  };

  const handleSubmit = useCallback(() => {
    const newErrors = validateFields({ date, category, value, description });

    if (newErrors.length > 0) {
      addAlert(newErrors);
      return;
    }

    if (funcActions) {
      const { funcOne, funcTwo, funcThree } = funcActions;
      funcOne && funcOne();
      funcTwo && funcTwo();
      funcThree && funcThree();
    }
    closeModal();
    addAlert([{ message: "Registro criado com sucesso!", type: "success" }]);
  }, [value, description, date, category, funcActions]);

  useEffect(() => {
    if (!modalOpen) {
      updateCategory("");
      updateDate(dateHelpers.initialDate());
      updateDescription("");
      updateValue("");
    }
  }, [modalOpen, change]);

  const selectList = (option: string) => {
    if (option) updateCategory(option);
  };

  return (
    <>
      <div
        className="w-full flex justify-center text-white font-semibold rounded transition duration-300 ease-in-out"
        onClick={openModal}
      >
        <div
          className={`flex items-center text-white cursor-pointer hover:opacity-85 font-semibold rounded transition duration-300 ease-in-out ${className}`}
        >
          {modalName}
        </div>
      </div>
      <section
        ref={overlay}
        onClick={clickCloseRef}
        className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-sm border-none text-sm ${
          modalOpen ? "" : "hidden"
        }`}
      >
        <div className="bg-gray-800 fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-background shadow-lg duration-200 sm:rounded-lg md:w-full">
          <G_Header
            change={change}
            setChange={setChange}
            subtitleOne={"RECEITAS"}
            subtitleTwo={"DESPESAS"}
          />

          <main className="flex flex-col gap-2 py-2 px-4">
            <G_InputArea
              name="DATA"
              type="date"
              value={date || dateHelpers.initialDate()}
              onChange={(e) => updateDate(e.target.value)}
            />

            {change && (
              <G_Select
                subtitle="CATEGORIA"
                onSelect={selectList}
                optionList={incomeKeys.map((item) => categories[item]?.title)}
              />
            )}
            {!change && (
              <G_Select
                subtitle="CATEGORIA"
                onSelect={selectList}
                optionList={expenseKeys.map((item) => categories[item]?.title)}
              />
            )}

            <G_InputArea
              name="VALOR"
              type="number"
              icon="R$"
              value={value}
              onChange={(e) => updateValue(e.target.value)}
            />
            <G_InputArea
              name="DESCRICÃO"
              rows={3}
              value={description}
              onChange={(e) => updateDescription(e.target.value)}
            />
          </main>

          <footer className="flex gap-1 justify-end py-2 px-4">
            <G_Button
              onClick={handleSubmit}
              className=" bg-blue-900 text-white py-3 px-4 rounded-sm hover:bg-blue-800"
            >
              REGISTRAR
            </G_Button>
          </footer>
        </div>
      </section>
    </>
  );
};

export default G_Modal;
