import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../../components/Button";
import { AccountType } from "../../../type/AccountType";

import { useState } from "react";

import { useToastStore, ToastType } from "../../../components/Toast";
import { useApiContext } from "../../../context/ApiContext";
import { useConfirmStore } from "../../../components/Confirm";

type AccountCardProps = {
  acc: AccountType;
};

export default function AccountCard({ acc }: AccountCardProps) {
  const { apiDeleteAccount, apiUpdateAccount } = useApiContext();
  const [editingaccount_id, setEditingaccount_id] = useState<string | null>(
    null
  );
  const { showAlert } = useToastStore();
  const { handleConfirm } = useConfirmStore();

  const [account, setAccount] = useState<AccountType>({
    name: acc.name,
    branch: acc.branch,
    number: acc.number,
    type: acc.type,
    id: acc.id,
    // records: [],
  });

  const isError = (
    accountValue: string,
    error: string,
    errors: ToastType[]
  ) => {
    if (accountValue.length < 3) {
      errors.push({
        message: `${error} deve ter 3 caractéres ou mais.`,
        type: "error",
      });
    }
  };

  const handleEdit = async (id: string, item: AccountType) => {
    const errors: ToastType[] = [];
    isError(account.name, "Nome", errors);
    isError(account.branch, "Agência", errors);
    isError(account.number, "Número", errors);
    isError(account.type, "Tipo de conta", errors);

    if (editingaccount_id === id) {
      if (errors.length > 0) {
        errors.forEach((error) => showAlert(error.message!, error.type));
        return;
      }
      await apiUpdateAccount(id, item);
      setEditingaccount_id(null);
      showAlert(`Conta atualizada com sucesso`, "success");
    } else {
      showAlert(`\u2713 para confirmar`, "warning");
      setEditingaccount_id(id);
    }
  };

  const del = async (id: string) => {
    const response = await apiDeleteAccount(id);

    if (response) showAlert(`Conta deletada com sucesso`, "success");
  };

  const handleDelete = async (id: string) => {
    if (id) {
      handleConfirm({
        message: "Deseja deletar conta?",
        callback: async () => await del(id),
      });
    } else {
      showAlert(`Conta deletada com sucesso`, "success");
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({ ...account, name: event.target.value });
  };

  const handleBranchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({ ...account, branch: event.target.value });
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({ ...account, number: event.target.value });
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({ ...account, type: event.target.value });
  };

  return (
    <section className="bg-white/5 w-80 md:w-64 lg:w-60 flex flex-col items-center justify-center p-4 rounded-md gap-2">
      <main className="w-full p-2">
        <header className="w-full h-28 flex justify-start items-center pb-2 border-b border-gray-900">
          <span className="min-w-12 min-h-12 flex justify-center items-center text-2xl font-semibold bg-gray-700 rounded-full border-b">
            {account.name[0]}
          </span>
          <input
            name="name"
            className={`text-2xl ml-2 bg-transparent overflow-hidden  ${
              editingaccount_id ? " border-b" : ""
            }`}
            value={account.name || ""}
            disabled={!editingaccount_id}
            maxLength={15}
            onChange={handleNameChange}
          />
        </header>
        <div className="my-2 h-12">
          <h3 className="text-xs self-start opacity-20">AGÊNCIA</h3>
          <input
            name="agencia"
            className={`text-xl bg-transparent w-full ${
              editingaccount_id ? " border-b" : ""
            }`}
            value={account.branch || ""}
            disabled={!editingaccount_id}
            maxLength={15}
            onChange={handleBranchChange}
          />
        </div>

        <div className="my-2 h-12">
          <h3 className="text-xs self-start opacity-20">NUMERO</h3>
          <input
            name="agencia"
            className={`text-xl bg-transparent w-full ${
              editingaccount_id ? " border-b" : ""
            }`}
            value={account.number || ""}
            disabled={!editingaccount_id}
            maxLength={15}
            onChange={handleNumberChange}
          />
        </div>

        <div className="my-2 h-12">
          <h3 className="text-xs self-start opacity-20">TIPO</h3>
          <input
            name="agencia"
            className={`text-xl bg-transparent w-full ${
              editingaccount_id ? " border-b" : ""
            }`}
            value={account.type || ""}
            disabled={!editingaccount_id}
            maxLength={15}
            onChange={handleTypeChange}
          />
        </div>
      </main>
      <div className="flex h-5 justify-end space-x-2 text-sm my-2">
        <div
          onClick={() =>
            handleEdit(account.id ?? "", {
              name: account.name,
              branch: account.branch,
              number: account.number,
              type: account.type,
              id: account.id,
            })
          }
          className={`${
            editingaccount_id ? "bg-green-500" : "bg-orange-500"
          } flex justify-center w-20 items-center rounded-sm cursor-pointer p-4`}
          title={editingaccount_id ? "Confirmar" : "Editar"}
        >
          {editingaccount_id ? (
            <Icon icon="line-md:confirm" width={30} height={30} />
          ) : (
            <Icon icon="line-md:edit" width={30} height={30} />
          )}
        </div>
        <hr />
        <Button
          onClick={() => handleDelete(account.id ?? "")}
          className="flex justify-center bg-red-600 p-4 w-20 rounded-sm"
        >
          <Icon icon="ph:trash" width={30} height={30} />
        </Button>
      </div>
    </section>
  );
}
