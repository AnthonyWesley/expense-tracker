import {
  useState,
  useCallback,
  useEffect,
  useRef,
  ChangeEvent,
  MouseEventHandler,
  HTMLAttributes,
} from "react";
import { categories } from "../../data/categories";
import { useRecordStore } from "../../store/useRecordStore";
import { CategoriesType } from "../../type/CategoriesType";
import G_InputArea from "./G_InputArea";
import { ClipboardList } from "lucide-react";
import { ErrorObject, Toast } from "../Toast";
import G_Button from "./G_Button";

interface ModalProp extends HTMLAttributes<HTMLDivElement> {
  modalName?: string | JSX.Element;
  className?: string;
  funcActions?: {
    funcOne?: () => void;
    funcTwo?: () => void;
    funcTree?: () => void;
  };
}

const G_Modal = ({ modalName, className, funcActions }: ModalProp) => {
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

  const [modalOpen, setModalOpen] = useState(false);
  const [change, setChange] = useState(true);
  const overlay = useRef(null);
  const [errors, setErrors] = useState<ErrorObject>();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const clickCloseRef = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target === overlay.current) {
      closeModal();
    }
  };

  const handleSubmit = useCallback(() => {
    const newErrors: ErrorObject = {};
    if (!date) newErrors.errorDate = "DATA INVÁLIDA";
    if (!category) newErrors.errorCategory = "CATEGORIA INVÁLIDA";
    if (!Number(value)) newErrors.errorValue = "VALOR INVÁLIDO";
    if (description.length < 4)
      newErrors.errorDescription = "DESCRIÇÃO INVÁLIDA";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (funcActions) {
      const { funcOne, funcTwo, funcTree } = funcActions;
      funcOne && funcOne();
      funcTwo && funcTwo();
      funcTree && funcTree();
    }
    closeModal();
  }, [value, description, date, category, funcActions]);

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
    if (!modalOpen) {
      updateCategory("");
      updateDate("");
      updateDescription("");
      updateValue("");
    }
  }, [modalOpen, change]);

  return (
    <>
      <Toast text={errors ? errors : undefined} />
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
        onClick={clickCloseRef as unknown as MouseEventHandler<HTMLElement>}
        ref={overlay}
        className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-sm border-none lg:text-sm  ${
          modalOpen ? "" : "hidden"
        }`}
      >
        <div className="bg-gray-800 fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-background shadow-lg duration-200 sm:rounded-lg md:w-full">
          <header className="flex flex-col justify-between bg-gray-900 p-4 rounded-sm">
            <div className="flex justify-between items-center">
              <span className="px-2"> </span>
              <h1 className="text-lg">REGISTRAR</h1>
              <span className="cursor-pointer px-2" onClick={closeModal}>
                X
              </span>
            </div>
            <div className="flex justify-center gap-3 py-2 px-4">
              <label
                className="w-full cursor-pointe"
                onClick={() => setChange(true)}
              >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div
                  className={`max-w-xl rounded-md bg-transparent p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow border ${
                    change
                      ? "border-green-600 peer-checked:text-green-600 peer-checked:ring-green-400"
                      : "border-none"
                  }`}
                >
                  <div className="flex flex-col gap-1">ENTRADAS</div>
                </div>
              </label>

              <span className="border border-gray-500 "></span>
              <label
                className="cursor-pointer w-full"
                onClick={() => setChange(false)}
              >
                <input type="radio" className="peer sr-only" name="pricing" />
                <div className="max-w-xl rounded-md bg-transparent p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-red-600 peer-checked:ring-red-400">
                  <div className="flex flex-col gap-1">SAÍDAS</div>
                </div>
              </label>
            </div>
          </header>

          <main className="flex flex-col gap-2  py-2 px-4">
            <G_InputArea
              name="DATA"
              type="date"
              value={date}
              onChange={(e) => updateDate(e.target.value)}
            />

            <div className="flex items-center py-2 px-4 border border-white/15 rounded-md">
              <ClipboardList className="opacity-35" />

              <select
                onChange={(e) => updateCategory(e.target.value)}
                className="py-2 px-4 w-full rounded-sm outline-none bg-transparent"
              >
                <optgroup className="bg-gray-800 ">
                  <option value="">CATEGORIA</option>

                  {change &&
                    "income" &&
                    incomeKeys.map((item, index) => (
                      <option key={index} value={item}>
                        {categories[item].title}
                      </option>
                    ))}

                  {!change &&
                    "expense" &&
                    expenseKeys.map((item, index) => (
                      <option key={index} value={item}>
                        {categories[item].title}
                      </option>
                    ))}
                </optgroup>
              </select>
            </div>
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
              className=" bg-cyan-500 text-white py-2 px-4 rounded-sm hover:bg-cyan-600"
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
