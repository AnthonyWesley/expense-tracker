import { useState } from "react";
import { useToastStore, ToastType } from "../../../components/Toast";
import { useApiContext } from "../../../context/ApiContext";
import { AccountType } from "../../../type/AccountType";
import { useModalStore } from "../../../components/Modal";

export default function useAccountActions() {
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
    }
  };
  return { createAccount, account, setAccount };
}
