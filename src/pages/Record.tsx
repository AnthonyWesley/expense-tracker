import { ArrowUpFromLine, ArrowDownFromLine } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useApiContext } from "../context/ApiContext";
import { categories } from "../data/categories";
import { dateHelpers } from "../helpers/DateHelpers";
import { findItemByParams, formattedCurrency } from "../helpers/others";
import { useRecordStore } from "../store/useRecordStore";
import { useState } from "react";
import G_Button from "../components/generics/G_Button";
import G_Modal from "../components/generics/G_Modal";
import G_Alert from "../components/generics/G_Alert";

export default function Record() {
  const { id } = useParams() as { id: string };
  const { list, apiDeleteRecord, apiUpdateRecord } = useApiContext();
  const { category, date, description, value } = useRecordStore();
  const navigate = useNavigate();

  const listId = findItemByParams(list, id);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const deleteRecord = async () => {
    await apiDeleteRecord(id);

    navigate("/");
  };

  if (listId === undefined) {
    return [];
  }

  return (
    <div className="container mx-auto rounded-lg my-20 p-4 bg-white">
      <div className="space-y-1">
        <h4
          className="text-md font-bold leading-none rounded-sm p-4"
          style={{
            backgroundColor: categories[listId?.category]?.color,
          }}
        >
          {categories[listId?.category]?.title}
        </h4>
        <p className="text-sm text-appPrimaryColor p-4">
          {listId?.description}
        </p>
      </div>

      <hr className="my-4" />

      <div className="flex h-5 items-center space-x-4 text-sm text-appPrimaryColor">
        <div>
          {(categories[listId?.category]?.expense && (
            <ArrowUpFromLine color="red" />
          )) || <ArrowDownFromLine color="green" />}
        </div>
        <hr />
        <div>{formattedCurrency(listId?.value)}</div>
        <hr />
        <div>{dateHelpers.formatDate(listId?.date)}</div>
      </div>

      <hr className="my-4 text-right" />

      <div className="flex h-5 justify-end space-x-2 text-sm my-2 ">
        <G_Button onClick={() => navigate("/")} className="bg-blue-500 p-4">
          VOLTAR
        </G_Button>
        <hr />
        <G_Modal
          key={1}
          className="bg-yellow-600 p-4"
          modalName={"EDITAR"}
          funcActions={{
            funcTwo: async () =>
              await apiUpdateRecord(id, {
                id: id,
                date: dateHelpers.newDateAdjusted(date),
                category: category,
                description: description,
                value: parseFloat(value),
              }),
          }}
        />
        ,
        <hr />
        <G_Button onClick={openAlert} className="bg-red-600 p-4">
          DELETAR
        </G_Button>
      </div>
      <G_Alert
        description="Deseja fazer o logout ?"
        isOpen={isAlertOpen}
        onClose={closeAlert}
        functionProp={{
          action: deleteRecord,
        }}
      />
    </div>
  );
}
