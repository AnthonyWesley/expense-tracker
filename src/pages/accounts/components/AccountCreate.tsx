import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { ToastType, useToastStore } from "../../../components/Toast";
import { useApiContext } from "../../../context/ApiContext";
import { AccountType } from "../../../type/AccountType";

import { useModalStore } from "../../../components/Modal";

export default function AccountCreate() {
  const { apiCreateAccount } = useApiContext();
  const { showAlert } = useToastStore();
  const { closeModal } = useModalStore();
  const [account, setAccount] = useState<AccountType>({
    name: "",
    branch: "",
    number: "",
    type: "",
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

  const createAccount = async () => {
    const errors: ToastType[] = [];
    isError(account.name, "Nome", errors);
    isError(account.branch, "Agência", errors);
    isError(account.number, "Número", errors);
    isError(account.type, "Tipo de conta", errors);

    if (errors.length > 0) {
      errors.forEach((error) => showAlert(error.message!, error.type));
    } else {
      apiCreateAccount({
        name: account.name.trim(),
        branch: account.branch,
        number: account.number,
        type: account.type,
        // records: [],
      });

      closeModal();
      setAccount({
        name: "",
        branch: "",
        number: "",
        type: "",
        id: "",
      });
    }
  };

  return (
    <section className="p-4 bg-gray-800 w-full">
      <header className="w-full p-2">
        <h3 className="text-xs self-start opacity-20">NOME</h3>

        <div className="flex justify-start items-center gap-1 pb-2 border-b border-gray-700">
          <span className="min-w-12 min-h-12 flex justify-center items-center text-2xl font-semibold bg-gray-700 rounded-full border-b">
            {account.name[0]?.toUpperCase()}
          </span>
          <Input
            value={account.name}
            onChange={(e) =>
              setAccount({ ...account, name: e.target.value.toUpperCase() })
            }
          />
        </div>
      </header>
      <main className="w-full p-2">
        <div className="my-2">
          <h3 className="text-xs self-start opacity-20">AGÊNCIA</h3>
          <Input
            value={account.branch}
            onChange={(e) => setAccount({ ...account, branch: e.target.value })}
          />
        </div>
        <div className="my-2">
          <h3 className="text-xs self-start opacity-20">NÚMERO</h3>
          <Input
            value={account.number}
            onChange={(e) => setAccount({ ...account, number: e.target.value })}
          />
        </div>
        <div className="my-2">
          <h3 className="text-xs self-start opacity-20">TIPO</h3>
          <Input
            value={account.type}
            onChange={(e) => setAccount({ ...account, type: e.target.value })}
          />
        </div>
      </main>
      <footer className="w-full flex gap-2">
        <Button
          className="bg-orange-400 p-2 w-full flex justify-center"
          onClick={createAccount}
        >
          CREAR
        </Button>
      </footer>
    </section>
  );
}
